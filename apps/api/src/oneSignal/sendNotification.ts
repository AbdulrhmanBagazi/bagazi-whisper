import * as OneSignal from 'onesignal-node';

const appId = process.env.OneSignal_App_ID as string;
const apiKey = process.env.OneSignal_Rest_API_Key as string;
const client = new OneSignal.Client(appId, apiKey);

type msg = 'CANCELED' | 'DECLINED' | 'WAITLIST' | 'PENDING' | 'INTERVIEW' | 'APPROVED' | 'COMPLETED' | 'INACTIVE';

const Applicants_Status = {
  PENDING: '',
  WAITLIST: 'تم تحديث حالة الطلب إلى قائمة الإنتظار،',
  INTERVIEW: 'تم تحديث حالة الطلب إلى قائمة المقابلة الشخصية،',
  APPROVED: 'تم قبولك للعمل في ',
  DECLINED: 'نأسف لإبلاغك ، لم يتم قبولك للعمل في',
  CANCELED: '',
  COMPLETED: 'تهانينا لقد أكملت عملك في',
  INACTIVE: '',
};

const Applicants_Status_en = {
  PENDING: '',
  WAITLIST: 'The status of the application has been updated to waiting list,',
  INTERVIEW: 'The status of the application has been updated to interview list,',
  APPROVED: 'You have been accepted to work at',
  DECLINED: "we are sorry to inform you, you didn't get accepted to work at",
  CANCELED: '',
  COMPLETED: 'congratulations you have completed your work at',
  INACTIVE: '',
};

const SendNotification = async (msg: msg, userId: string, event: string, event_en: string) => {
  try {
    if (msg === 'CANCELED' || msg === 'PENDING' || msg === 'INACTIVE') {
      return 'dont send noti';
    }

    // eslint-disable-next-line security/detect-object-injection
    const ar = Applicants_Status[msg];
    // eslint-disable-next-line security/detect-object-injection
    const en = Applicants_Status_en[msg];

    const response = await client.createNotification({
      contents: {
        ar: `${ar} ${event}`,
        en: `${en} ${event_en}`,
      },
      include_external_user_ids: [userId],
    });

    return response;
  } catch (e) {
    if (e instanceof OneSignal.HTTPError) {
      // When status code of HTTP response is not 2xx, HTTPError is thrown.
      //   console.log(e.statusCode);
      //   console.log(e.body);

      return {
        statusCode: e.statusCode,
        body: e.body,
      };
    }

    return e;
  }
};

export default SendNotification;
