import request from './utils/request';
import { unique, formatTimestamp } from './utils/format';
import type { Company, Seminar, SeminarDetail } from './types';

interface CommonParameter {
  school: string;
}

function getStatus(status: {
  isExpired: boolean;
  isCancel: boolean;
  isOfficial: boolean;
  isInProgress: boolean;
}): number {
  if (status.isInProgress) return 1;
  if (status.isCancel) return 2;
  if (status.isExpired) return 3;

  return 0;
}

function getCDNURL(url: string): string {
  if (url.startsWith('//')) {
    url = 'https:' + url;
  }

  return url + '!y';
}

function getCompany(result: any): Company | null {
  if (!result) {
    return null;
  }

  return {
    id: result.id,
    name: result.name,
    logo: getCDNURL(result.logo_src),
    description: (!result.city_name || result.city_name === '市辖区' ? result.province_name : result.city_name) + ' ' + result.xingzhi_id_name + ' ' + result.business_name,
    type: result.xingzhi_id_name,
    region: result.province_name + (result.city_name === '市辖区' ? '' : result.city_name) + result.region_name,
    industry: result.business_name,
    scale: result.guimo_id_name,
    registeredCapital: result.catype_name || '',
    website: result.weburl || '',
    address: result.address,
    createTime: formatTimestamp(result.start_time),
    verifyTime: result.verify_time === 0 ? '' : formatTimestamp(result.verify_time),
    license: result.license || '',
    position: {
      latitude: result.latitude,
      longitude: result.longitude,
    },
    introduction: result.content || '',
    tags: result.tagcomlist.map((item: any) => item.title),
  };
}

export async function getSeminarList(options: {
  page: number;
  size: number;
  search?: string;
} & CommonParameter): Promise<{
  total: number;
  items: Seminar[];
}> {
  const { page, size, search = '', school } = options;
  const data = await request('/preach/getlist', {
    page,
    size,
    isunion: 2,
    laiyuan: 0,
    keywords: search,
    school,
  }) as unknown as { list: any[]; count: number };
  const items = data.list.map((item: any) => {
    return {
      id: item.id,
      title: item.title,
      company: {
        id: item.com_id,
        name: item.com_id_name,
        logo: getCDNURL(item.com_id_logosrc),
        description: '暂无',
      },
      university: item.school_id_name,
      address: item.address || item.tmp_field_name || '线上宣讲会',
      view: item.viewcount,
      time: item.hold_date + ' ' + item.hold_starttime + '-' + item.hold_endtime,
      status: getStatus({
        isExpired: item.timestatus === 3,
        isCancel: item.publish_status === 2,
        isOfficial: item.istop === 1,
        isInProgress: item.timestatus === 1,
      }),
      contact: {},
      major: [],
    };
  });

  return {
    total: data.count,
    items,
  };
}

export async function getSeminarDetail(params: { id: string } & CommonParameter): Promise<SeminarDetail> {
  const result: any = await request('/preach/detail', params);

  return {
    id: result.id,
    title: result.title,
    company: getCompany(result.comInfo) as Company,
    university: result.school_id_name,
    address: result.address || result.tmp_field_name || '线上宣讲会',
    view: result.viewcount,
    content: result.remarks,
    tips: result.schoolwarn,
    poster: result.haibao_id_src ? getCDNURL('https:' + result.haibao_id_src.linkpath) : '',
    time: result.hold_date + ' ' + result.hold_starttime + '-' + result.hold_endtime,
    status: getStatus({
      isExpired: result.timestatus === 3,
      isCancel: result.publish_status === 2,
      isOfficial: result.istop === 1,
      isInProgress: result.timestatus === 1,
    }),
    contact: {
      name: result.contacts,
      email: result.email,
      telephone: result.phone,
    },
    major: unique(result.ProfessionalList.map((item: any) => item.professional_id_name)),
  };
}

export async function getCompanyDetail(id: string): Promise<Company> {
  const result = await request('/com/detail', {
    id,
  });

  return getCompany(result) as Company;
}
