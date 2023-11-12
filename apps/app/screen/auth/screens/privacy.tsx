import React, { useState } from 'react'
import { I18nManager, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Text } from 'react-native-paper'

export default function PrivacyScreen() {
  const [isArabic] = useState(I18nManager.isRTL ? true : false)
  return (
    <ScrollView>
      {isArabic ? (
        <View style={{ padding: 10 }}>
          <Text>سياسة الخصوصية لموقع Whisper الاجتماعي</Text>
          <Text>
            في Whisper social، الذي يمكن الوصول إليه من Whisper social، إحدى
            أولوياتنا الرئيسية هي خصوصية زوارنا. تحتوي وثيقة سياسة الخصوصية هذه
            على أنواع المعلومات التي يتم جمعها وتسجيلها بواسطة Whisper Social
            وكيفية استخدامها.
          </Text>
          <Text>
            إذا كانت لديك أسئلة إضافية أو كنت بحاجة إلى مزيد من المعلومات حول
            سياسة الخصوصية الخاصة بنا، فلا تتردد في الاتصال بنا.
          </Text>
          <Text>
            تنطبق سياسة الخصوصية هذه فقط على أنشطتنا عبر الإنترنت وهي صالحة
            لزوار تطبيق الهاتف المحمول الخاص بنا فيما يتعلق بالمعلومات التي
            شاركوها و/أو جمعوها في Whisper Social. لا تنطبق هذه السياسة على أي
            معلومات يتم جمعها دون اتصال بالإنترنت أو عبر قنوات أخرى غير تطبيق
            الهاتف المحمول هذا.
          </Text>
          <Text>موافقة</Text>
          <Text>
            باستخدام تطبيق الهاتف المحمول الخاص بنا، فإنك توافق بموجبه على سياسة
            الخصوصية الخاصة بنا وتوافق على شروطها.
          </Text>
          <Text>المعلومات التي نجمعها</Text>
          <Text>
            سيتم توضيح المعلومات الشخصية التي يُطلب منك تقديمها، وأسباب مطالبتك
            بتقديمها، لك عندما نطلب منك تقديم معلوماتك الشخصية.
          </Text>
          <Text>
            إذا اتصلت بنا مباشرة، فقد نتلقى معلومات إضافية عنك مثل اسمك وعنوان
            بريدك الإلكتروني ورقم هاتفك ومحتويات الرسالة و/أو المرفقات التي قد
            ترسلها إلينا، وأي معلومات أخرى قد تختار تقديمها.
          </Text>
          <Text>
            عندما تقوم بالتسجيل للحصول على حساب، قد نطلب معلومات الاتصال الخاصة
            بك، بما في ذلك عناصر مثل الاسم واسم الشركة والعنوان وعنوان البريد
            الإلكتروني ورقم الهاتف.
          </Text>
          <Text>كيف نستخدم معلوماتك</Text>
          <Text>نحن نستخدم المعلومات التي نجمعها بطرق مختلفة، بما في ذلك:</Text>
          <Text>
            توفير وتشغيل وصيانة تطبيق الهاتف المحمول الخاص بنا تحسين وتخصيص
            وتوسيع تطبيق الهاتف المحمول الخاص بنا فهم وتحليل كيفية استخدامك
            لتطبيق الهاتف المحمول الخاص بنا تطوير منتجات وخدمات وميزات ووظائف
            جديدة التواصل معك، إما بشكل مباشر أو من خلال أحد شركائنا، بما في ذلك
            لخدمة العملاء، لتزويدك بالتحديثات والمعلومات الأخرى المتعلقة بتطبيق
            الهاتف المحمول، ولأغراض التسويق والترويج نرسل لك رسائل البريد
            الإلكتروني البحث عن الاحتيال ومنعه
          </Text>
          <Text>ملفات السجل</Text>
          <Text>
            يتبع موقع Whisper Social الإجراء القياسي لاستخدام ملفات السجل. تقوم
            هذه الملفات بتسجيل الزوار عند زيارتهم لتطبيقات الهاتف المحمول. جميع
            شركات الاستضافة تفعل ذلك وجزء من تحليلات خدمات الاستضافة. تتضمن
            المعلومات التي تم جمعها بواسطة ملفات السجل عناوين بروتوكول الإنترنت
            (IP)، ونوع المتصفح، وموفر خدمة الإنترنت (ISP)، وختم التاريخ والوقت،
            وصفحات الإحالة/الخروج، وربما عدد النقرات. ولا ترتبط هذه بأي معلومات
            تحدد هويتك الشخصية. الغرض من المعلومات هو تحليل الاتجاهات وإدارة
            الموقع وتتبع حركة المستخدمين على تطبيق الهاتف المحمول وجمع المعلومات
            الديموغرافية.
          </Text>
          <Text>ملفات تعريف الارتباط وإشارات الويب</Text>
          <Text>
            مثل أي تطبيق جوال آخر، يستخدم تطبيق Whisper Social "ملفات تعريف
            الارتباط". تُستخدم ملفات تعريف الارتباط هذه لتخزين المعلومات بما في
            ذلك تفضيلات الزوار والصفحات الموجودة على تطبيق الهاتف المحمول التي
            وصل إليها الزائر أو زارها. يتم استخدام المعلومات لتحسين تجربة
            المستخدمين من خلال تخصيص محتوى صفحة الويب الخاصة بنا بناءً على نوع
            متصفح الزوار و/أو المعلومات الأخرى.
          </Text>
          <Text>جوجل دبل كليك DART كوكي</Text>
          <Text>
            تعد Google أحد البائعين الخارجيين على موقعنا. كما أنها تستخدم ملفات
            تعريف الارتباط، المعروفة باسم ملفات تعريف الارتباط DART، لعرض
            الإعلانات لزوار موقعنا بناءً على زيارتهم لموقع www.Mobile app.com
            والمواقع الأخرى على الإنترنت. ومع ذلك، يمكن للزوار اختيار رفض
            استخدام ملفات تعريف الارتباط DART من خلال زيارة سياسة الخصوصية
            الخاصة بإعلانات Google وشبكة المحتوى على عنوان URL التالي
            –https://policies.google.com/technologies/ads
          </Text>
          <Text>شركاؤنا الإعلانيون</Text>
          <Text>
            قد يستخدم بعض المعلنين على موقعنا ملفات تعريف الارتباط وإشارات
            الويب. شركاء الإعلان لدينا مدرجون أدناه. لدى كل من شركاء الإعلان
            لدينا سياسة خصوصية خاصة بهم فيما يتعلق بسياساتهم المتعلقة ببيانات
            المستخدم. لتسهيل الوصول، قمنا بربط سياسات الخصوصية الخاصة بهم أدناه.
          </Text>
          <Text>جوجل https://policies.google.com/technologies/ads</Text>
          <Text>سياسات خصوصية شركاء الإعلان</Text>
          <Text>
            يمكنك الرجوع إلى هذه القائمة للعثور على سياسة الخصوصية لكل من شركاء
            الإعلان في Whisper Social.
          </Text>
          <Text>
            تستخدم خوادم الإعلانات أو شبكات الإعلانات التابعة لجهات خارجية
            تقنيات مثل ملفات تعريف الارتباط أو جافا سكريبت أو إشارات الويب التي
            يتم استخدامها في الإعلانات والروابط الخاصة بها والتي تظهر على مواقع
            التواصل الاجتماعي Whisper، والتي يتم إرسالها مباشرة إلى متصفح
            المستخدمين. إنهم يتلقون عنوان IP الخاص بك تلقائيًا عند حدوث ذلك.
            تُستخدم هذه التقنيات لقياس فعالية حملاتها الإعلانية و/أو لتخصيص
            المحتوى الإعلاني الذي تراه على تطبيقات الهاتف المحمول التي تزورها.
          </Text>
          <Text>
            لاحظ أن Whisper Social ليس لديه حق الوصول أو التحكم في ملفات تعريف
            الارتباط هذه التي يستخدمها معلنو الطرف الثالث.
          </Text>
          <Text>سياسات خصوصية الطرف الثالث</Text>
          <Text>
            لا تنطبق سياسة الخصوصية الخاصة بـ Whisper social على المعلنين
            الآخرين أو تطبيقات الهاتف المحمول. وبالتالي، ننصحك بمراجعة سياسات
            الخصوصية الخاصة بخوادم إعلانات الطرف الثالث هذه للحصول على معلومات
            أكثر تفصيلاً. وقد يتضمن ممارساتهم وتعليماتهم حول كيفية إلغاء
            الاشتراك في خيارات معينة.
          </Text>
          <Text>
            يمكنك اختيار تعطيل ملفات تعريف الارتباط من خلال خيارات المتصفح
            الفردية الخاصة بك. لمعرفة المزيد من المعلومات التفصيلية حول إدارة
            ملفات تعريف الارتباط مع متصفحات الويب المحددة، يمكن العثور عليها في
            تطبيقات الهاتف المحمول الخاصة بالمتصفحات.
          </Text>
          <Text>حقوق خصوصية CCPA (لا تبيع معلوماتي الشخصية)</Text>
          <Text>
            بموجب قانون CCPA، من بين حقوق أخرى، يحق للمستهلكين في كاليفورنيا:
          </Text>
          <Text>
            اطلب من الشركة التي تجمع البيانات الشخصية للمستهلك أن تكشف عن فئات
            وأجزاء محددة من البيانات الشخصية التي جمعتها الشركة عن المستهلكين.
          </Text>
          <Text>
            اطلب من الشركة حذف أي بيانات شخصية عن المستهلك قامت الشركة بجمعها.
          </Text>
          <Text>
            اطلب من الشركة التي تبيع البيانات الشخصية للمستهلك، عدم بيع البيانات
            الشخصية للمستهلك. إذا قمت بتقديم طلب، لدينا شهر واحد للرد عليك. إذا
            كنت ترغب في ممارسة أي من هذه الحقوق، يرجى الاتصال بنا. حقوق حماية
            البيانات بموجب القانون العام لحماية البيانات (GDPR). نود التأكد من
            أنك على دراية كاملة بجميع حقوق حماية البيانات الخاصة بك. يحق لكل
            مستخدم ما يلي: حق الوصول – لديك الحق في طلب نسخ من بياناتك الشخصية.
            قد نفرض عليك رسومًا بسيطة مقابل هذه الخدمة. الحق في التصحيح – يحق لك
            أن تطلب تصحيح أي معلومات تعتقد أنها غير دقيقة. لديك أيضًا الحق في
            طلب استكمال المعلومات التي تعتقد أنها غير كاملة. الحق في المحو – يحق
            لك أن تطلب مسح بياناتك الشخصية، في ظل ظروف معينة. الحق في تقييد
            المعالجة – يحق لك أن تطلب تقييد معالجة بياناتك الشخصية، في ظل ظروف
            معينة. الحق في الاعتراض على المعالجة – لديك الحق في الاعتراض على
            معالجتنا لبياناتك الشخصية، في ظل ظروف معينة. الحق في إمكانية نقل
            البيانات – لديك الحق في طلب نقل البيانات التي جمعناها إلى مؤسسة
            أخرى، أو إليك مباشرة، في ظل ظروف معينة. إذا قمت بتقديم طلب، لدينا
            شهر واحد للرد عليك. إذا كنت ترغب في ممارسة أي من هذه الحقوق، يرجى
            الاتصال بنا.
          </Text>
          <Text>معلومات الاطفال</Text>
          <Text>
            جزء آخر من أولويتنا هو إضافة الحماية للأطفال أثناء استخدام الإنترنت.
            نحن نشجع الآباء والأوصياء على مراقبة نشاطهم عبر الإنترنت والمشاركة
            فيه و/أو مراقبته وتوجيهه.
          </Text>
          <Text>
            لا تقوم Whisper Social عن قصد بجمع أي معلومات تعريف شخصية من الأطفال
            الذين تقل أعمارهم عن 13 عامًا. إذا كنت تعتقد أن طفلك قدم هذا النوع
            من المعلومات على تطبيق الهاتف المحمول الخاص بنا، فإننا نشجعك بشدة
            على الاتصال بنا على الفور وسنبذل قصارى جهدنا من أجل إزالة هذه
            المعلومات على الفور من سجلاتنا.
          </Text>
          <Text>التغييرات في سياسة الخصوصية هذه</Text>
          <Text>
            قد نقوم بتحديث سياسة الخصوصية الخاصة بنا من وقت لآخر. لذا ننصحك
            بمراجعة هذه الصفحة بشكل دوري لمعرفة أي تغييرات. وسوف نقوم بإعلامك
            بأي تغييرات عن طريق نشر سياسة الخصوصية الجديدة على هذه الصفحة. تسري
            هذه التغييرات فورًا بعد نشرها على هذه الصفحة.
          </Text>
          <Text>
            تم إنشاء سياسة الخصوصية الخاصة بنا بمساعدةمولد سياسة الخصوصية.
          </Text>
          <Text>اتصل بنا</Text>
          <Text>
            إذا كان لديك أي أسئلة أو اقتراحات حول سياسة الخصوصية الخاصة بنا، فلا
            تتردد في الاتصال بنا.
          </Text>
        </View>
      ) : (
        <View style={{ padding: 10 }}>
          <Text>Privacy Policy for Whisper social</Text>
          <Text>
            At Whisper social, accessible from Whisper social, one of our main
            priorities is the privacy of our visitors. This Privacy Policy
            document contains types of information that is collected and
            recorded by Whisper social and how we use it.
          </Text>
          <Text>
            If you have additional questions or require more information about
            our Privacy Policy, do not hesitate to contact us.
          </Text>
          <Text>
            This Privacy Policy applies only to our online activities and is
            valid for visitors to our Mobile app with regards to the information
            that they shared and/or collect in Whisper social. This policy is
            not applicable to any information collected offline or via channels
            other than this Mobile app.
          </Text>
          <Text>Consent</Text>
          <Text>
            By using our Mobile app, you hereby consent to our Privacy Policy
            and agree to its terms.
          </Text>
          <Text>Information we collect</Text>
          <Text>
            The personal information that you are asked to provide, and the
            reasons why you are asked to provide it, will be made clear to you
            at the point we ask you to provide your personal information.
          </Text>
          <Text>
            If you contact us directly, we may receive additional information
            about you such as your name, email address, phone number, the
            contents of the message and/or attachments you may send us, and any
            other information you may choose to provide.
          </Text>
          <Text>
            When you register for an Account, we may ask for your contact
            information, including items such as name, company name, address,
            email address, and telephone number.
          </Text>
          <Text>How we use your information</Text>
          <Text>
            We use the information we collect in various ways, including to:
          </Text>
          <Text>
            Provide, operate, and maintain our Mobile app Improve, personalize,
            and expand our Mobile app Understand and analyze how you use our
            Mobile app Develop new products, services, features, and
            functionality Communicate with you, either directly or through one
            of our partners, including for customer service, to provide you with
            updates and other information relating to the Mobile app, and for
            marketing and promotional purposes Send you emails Find and prevent
            fraud
          </Text>
          <Text>Log Files</Text>
          <Text>
            Whisper social follows a standard procedure of using log files.
            These files log visitors when they visit Mobile apps. All hosting
            companies do this and a part of hosting services' analytics. The
            information collected by log files include internet protocol (IP)
            addresses, browser type, Internet Service Provider (ISP), date and
            time stamp, referring/exit pages, and possibly the number of clicks.
            These are not linked to any information that is personally
            identifiable. The purpose of the information is for analyzing
            trends, administering the site, tracking users' movement on the
            Mobile app, and gathering demographic information.
          </Text>
          <Text>Cookies and Web Beacons</Text>
          <Text>
            Like any other Mobile app, Whisper social uses "cookies". These
            cookies are used to store information including visitors'
            preferences, and the pages on the Mobile app that the visitor
            accessed or visited. The information is used to optimize the users'
            experience by customizing our web page content based on visitors'
            browser type and/or other information.
          </Text>
          <Text>Google DoubleClick DART Cookie</Text>
          <Text>
            Google is one of a third-party vendor on our site. It also uses
            cookies, known as DART cookies, to serve ads to our site visitors
            based upon their visit to www.Mobile app.com and other sites on the
            internet. However, visitors may choose to decline the use of DART
            cookies by visiting the Google ad and content network Privacy Policy
            at the following URL https://policies.google.com/technologies/ads
          </Text>
          <Text>Our Advertising Partners</Text>
          <Text>
            Some of advertisers on our site may use cookies and web beacons. Our
            advertising partners are listed below. Each of our advertising
            partners has their own Privacy Policy for their policies on user
            data. For easier access, we hyperlinked to their Privacy Policies
            below. Google https://policies.google.com/technologies/ads
          </Text>
          <Text>Advertising Partners Privacy Policies</Text>
          <Text>
            You may consult this list to find the Privacy Policy for each of the
            advertising partners of Whisper social. Third-party ad servers or ad
            networks uses technologies like cookies, JavaScript, or Web Beacons
            that are used in their respective advertisements and links that
            appear on Whisper social, which are sent directly to users' browser.
            They automatically receive your IP address when this occurs. These
            technologies are used to measure the effectiveness of their
            advertising campaigns and/or to personalize the advertising content
            that you see on Mobile apps that you visit. Note that Whisper social
            has no access to or control over these cookies that are used by
            third-party advertisers.
          </Text>
          <Text>Third Party Privacy Policies</Text>
          <Text>
            Whisper social's Privacy Policy does not apply to other advertisers
            or Mobile apps. Thus, we are advising you to consult the respective
            Privacy Policies of these third-party ad servers for more detailed
            information. It may include their practices and instructions about
            how to opt-out of certain options. You can choose to disable cookies
            through your individual browser options. To know more detailed
            information about cookie management with specific web browsers, it
            can be found at the browsers' respective Mobile apps.
          </Text>
          <Text>CCPA Privacy Rights (Do Not Sell My Personal Information)</Text>
          <Text>
            Under the CCPA, among other rights, California consumers have the
            right to: Request that a business that collects a consumer's
            personal data disclose the categories and specific pieces of
            personal data that a business has collected about consumers. Request
            that a business delete any personal data about the consumer that a
            business has collected. Request that a business that sells a
            consumer's personal data, not sell the consumer's personal data. If
            you make a request, we have one month to respond to you. If you
            would like to exercise any of these rights, please contact us.
          </Text>
          <Text>GDPR Data Protection Rights</Text>
          <Text>
            We would like to make sure you are fully aware of all of your data
            protection rights. Every user is entitled to the following: The
            right to access - You have the right to request copies of your
            personal data. We may charge you a small fee for this service. The
            right to rectification - You have the right to request that we
            correct any information you believe is inaccurate. You also have the
            right to request that we complete the information you believe is
            incomplete. The right to erasure - You have the right to request
            that we erase your personal data, under certain conditions. The
            right to restrict processing - You have the right to request that we
            restrict the processing of your personal data, under certain
            conditions. The right to object to processing - You have the right
            to object to our processing of your personal data, under certain
            conditions. The right to data portability - You have the right to
            request that we transfer the data that we have collected to another
            organization, or directly to you, under certain conditions. If you
            make a request, we have one month to respond to you. If you would
            like to exercise any of these rights, please contact us.
          </Text>
          <Text>Children's Information</Text>
          <Text>
            Another part of our priority is adding protection for children while
            using the internet. We encourage parents and guardians to observe,
            participate in, and/or monitor and guide their online activity.
            Whisper social does not knowingly collect any Personal Identifiable
            Information from children under the age of 13. If you think that
            your child provided this kind of information on our Mobile app, we
            strongly encourage you to contact us immediately and we will do our
            best efforts to promptly remove such information from our records.
          </Text>
          <Text>Changes to This Privacy Policy</Text>
          <Text>
            We may update our Privacy Policy from time to time. Thus, we advise
            you to review this page periodically for any changes. We will notify
            you of any changes by posting the new Privacy Policy on this page.
            These changes are effective immediately, after they are posted on
            this page. Our Privacy Policy was created with the help of the
            Privacy Policy Generator.
          </Text>
          <Text>Contact Us</Text>
          <Text>
            If you have any questions or suggestions about our Privacy Policy,
            do not hesitate to contact us.
          </Text>
        </View>
      )}
    </ScrollView>
  )
}
