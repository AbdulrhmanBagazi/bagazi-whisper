import React, { useState } from 'react'
import { I18nManager, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Button, Text } from 'react-native-paper'

//https://www.privacypolicygenerator.info/live.php?token=A6DwsVTJ1cAGaO44AabT6UHoS1uRzhGK
//https://www.termsandcondiitionssample.com/live.php?token=iCUx2rpVwK4Ckt7zr2DLBeR9DFjuLt29

export default function TermsScreen() {
  const [isArabic] = useState(I18nManager.isRTL ? true : false)
  return (
    <ScrollView>
      {isArabic ? (
        <View style={{ padding: 10 }}>
          <Text>الشروط والأحكام الخاصة بـ Whisper Social</Text>
          <Text>مقدمة</Text>
          <Text>
            يجب أن تدير الشروط والأحكام القياسية لتطبيقات الهاتف المحمول
            المكتوبة على صفحة الويب هذه استخدامك لتطبيق الهاتف المحمول الخاص
            بنا، ويمكن الوصول إلى Whisper Social على Whisper Social.
          </Text>
          <Text>
            سيتم تطبيق هذه الشروط بالكامل وستؤثر على استخدامك لتطبيق الهاتف
            المحمول هذا. باستخدام تطبيق الهاتف المحمول هذا، فإنك توافق على قبول
            جميع الشروط والأحكام المكتوبة هنا. يجب ألا تستخدم تطبيق الهاتف
            المحمول هذا إذا كنت لا توافق على أي من الشروط والأحكام القياسية
            لتطبيقات الهاتف المحمول هذه. تم إنشاء هذه الشروط والأحكام
            بمساعدةالشروط والأحكام مولد العينة.
          </Text>
          <Text>
            لا يُسمح للقاصرين أو الأشخاص الذين تقل أعمارهم عن 18 عامًا باستخدام
            تطبيق الهاتف المحمول هذا.
          </Text>
          <Text>حقوق الملكية الفكرية</Text>
          <Text>
            بخلاف المحتوى الذي تملكه، وبموجب هذه الشروط، تمتلك شركة Whisper
            Social و/أو الجهات المرخصة التابعة لها جميع حقوق الملكية الفكرية
            والمواد الواردة في تطبيق الهاتف المحمول هذا.
          </Text>
          <Text>
            يتم منحك ترخيصًا محدودًا فقط لأغراض عرض المواد الموجودة في تطبيق
            الهاتف المحمول هذا.
          </Text>
          <Text>قيود</Text>
          <Text>أنت محظور على وجه التحديد من كل ما يلي:</Text>
          <Text>
            نشر أي مواد خاصة بتطبيقات الهاتف المحمول في أي وسائط أخرى؛ بيع
            وترخيص من الباطن و/أو تسويق أي مواد لتطبيقات الهاتف المحمول؛ الأداء
            العلني و/أو عرض أي مواد لتطبيقات الهاتف المحمول؛ استخدام تطبيق
            الهاتف المحمول هذا بأي طريقة تضر أو ​​قد تضر بتطبيق الهاتف المحمول
            هذا؛ استخدام تطبيق الهاتف المحمول هذا بأي طريقة تؤثر على وصول
            المستخدم إلى تطبيق الهاتف المحمول هذا؛ استخدام تطبيق الهاتف المحمول
            هذا بما يتعارض مع القوانين واللوائح المعمول بها، أو بأي شكل من
            الأشكال قد يسبب ضررًا لتطبيق الهاتف المحمول، أو لأي شخص أو كيان
            تجاري؛ الانخراط في أي استخراج للبيانات، أو جمع البيانات، أو استخراج
            البيانات أو أي نشاط آخر مماثل فيما يتعلق بتطبيق الهاتف المحمول هذا؛
            استخدام تطبيق الهاتف المحمول هذا للمشاركة في أي إعلان أو تسويق.
          </Text>
          <Text>
            يتم منع وصولك إلى مناطق معينة في تطبيق الهاتف المحمول هذا، وقد تقوم
            شركة Whisper Social بتقييد وصولك إلى أي مناطق في تطبيق الهاتف
            المحمول هذا، في أي وقت، وفقًا لتقدير مطلق. يعتبر أي معرف مستخدم
            وكلمة مرور قد تكون لديك لتطبيق الهاتف المحمول هذا سريًا ويجب عليك
            الحفاظ على السرية أيضًا.
          </Text>
          <Text>المحتوى الخاص بك</Text>
          <Text>
            في هذه الشروط والأحكام القياسية لتطبيقات الهاتف المحمول، يعني
            "المحتوى الخاص بك" أي صوت أو نص فيديو أو صور أو مواد أخرى تختار
            عرضها على تطبيق الهاتف المحمول هذا. من خلال عرض المحتوى الخاص بك،
            فإنك تمنح Whisper Social ترخيصًا غير حصري وغير قابل للإلغاء في جميع
            أنحاء العالم وقابل للترخيص من الباطن لاستخدامه وإعادة إنتاجه وتكييفه
            ونشره وترجمته وتوزيعه في أي وجميع الوسائط.
          </Text>
          <Text>
            يجب أن يكون المحتوى الخاص بك خاصًا بك ويجب ألا ينتهك حقوق أي طرف
            ثالث. تحتفظ Whisper Social بالحق في إزالة أي من المحتوى الخاص بك من
            تطبيق الهاتف المحمول هذا في أي وقت دون إشعار.
          </Text>
          <Text>لا ضمانات</Text>
          <Text>
            يتم توفير تطبيق الهاتف المحمول هذا "كما هو"، مع جميع الأخطاء، ولا
            تعبر Whisper Social عن أي إقرارات أو ضمانات، من أي نوع يتعلق بتطبيق
            الهاتف المحمول هذا أو المواد الموجودة في تطبيق الهاتف المحمول هذا.
            وأيضًا، لا يجوز تفسير أي شيء وارد في تطبيق الهاتف المحمول هذا على
            أنه نصيحة لك.
          </Text>
          <Text>تحديد المسؤولية</Text>
          <Text>
            لن تتحمل شركة Whisper social أو أي من مسؤوليها ومديريها وموظفيها بأي
            حال من الأحوال المسؤولية عن أي شيء ينشأ عن أو يرتبط بأي شكل من
            الأشكال باستخدامك لتطبيق الهاتف المحمول هذا سواء كانت هذه المسؤولية
            بموجب عقد. لن تتحمل شركة Whisper social، بما في ذلك مسؤوليها
            ومديريها وموظفيها، المسؤولية عن أي مسؤولية غير مباشرة أو تبعية أو
            خاصة تنشأ عن أو تتعلق بأي شكل من الأشكال باستخدامك لتطبيق الهاتف
            المحمول هذا.
          </Text>
          <Text>التعويض</Text>
          <Text>
            أنت بموجب هذا تعوض إلى أقصى حد Whisper Social من وضد أي و/أو جميع
            الالتزامات والتكاليف والمطالب وأسباب الدعوى والأضرار والمصروفات
            الناشئة بأي شكل من الأشكال المتعلقة بخرقك لأي من أحكام هذه الشروط.
          </Text>
          <Text>الاستقلالية</Text>
          <Text>
            إذا تبين أن أي حكم من هذه الشروط غير صالح بموجب أي قانون معمول به،
            فسيتم حذف هذه الأحكام دون التأثير على الأحكام المتبقية هنا.
          </Text>
          <Text>اختلاف المصطلحات</Text>
          <Text>
            يُسمح لشركة Whisper Social بمراجعة هذه الشروط في أي وقت حسبما تراه
            مناسبًا، وباستخدام تطبيق الهاتف المحمول هذا، يُتوقع منك مراجعة هذه
            الشروط بشكل منتظم.
          </Text>
          <Text>تكليف</Text>
          <Text>
            يُسمح لـ Whisper Social بتعيين حقوقه و/أو التزاماته ونقلها والتعاقد
            من الباطن بموجب هذه الشروط دون أي إشعار. ومع ذلك، لا يُسمح لك بتعيين
            أو نقل أو التعاقد من الباطن على أي من حقوقك و/أو التزاماتك بموجب هذه
            الشروط.
          </Text>
          <Text>اتفاق كامل</Text>
          <Text>
            تشكل هذه الشروط الاتفاقية الكاملة بينك وبين Whisper Social فيما
            يتعلق باستخدامك لتطبيق الهاتف المحمول هذا، وتحل محل جميع الاتفاقيات
            والتفاهمات السابقة.
          </Text>
          <Text>القانون الحاكم والاختصاص القضائي</Text>
          <Text>
            ستخضع هذه الشروط وتفسر وفقًا لقوانين ولاية سا، وستخضع للسلطة
            القضائية غير الحصرية لمحاكم الولاية والمحاكم الفيدرالية الموجودة في
            سا لحل أي نزاعات.
          </Text>
        </View>
      ) : (
        <View style={{ padding: 10 }}>
          <Text>Terms and Conditions for Whisper social</Text>
          <Text>Introduction</Text>
          <Text>
            These Mobile app Standard Terms and Conditions written on this
            webpage shall manage your use of our Mobile app, Whisper social
            accessible at Whisper social.
          </Text>
          <Text>
            These Terms will be applied fully and affect to your use of this
            Mobile app. By using this Mobile app, you agreed to accept all terms
            and conditions written in here. You must not use this Mobile app if
            you disagree with any of these Mobile app Standard Terms and
            Conditions. These Terms and Conditions have been generated with the
            help of the Terms And Conditiions Sample Generator.
          </Text>
          <Text>
            Minors or people below 18 years old are not allowed to use this
            Mobile app.
          </Text>
          <Text>Intellectual Property Rights</Text>
          <Text>
            Other than the content you own, under these Terms, Whisper social
            and/or its licensors own all the intellectual property rights and
            materials contained in this Mobile app.
          </Text>
          <Text>
            You are granted limited license only for purposes of viewing the
            material contained on this Mobile app.
          </Text>
          <Text>Restrictions</Text>
          <Text>
            You are specifically restricted from all of the following:
          </Text>
          <Text>
            publishing any Mobile app material in any other media; selling,
            sublicensing and/or otherwise commercializing any Mobile app
            material; publicly performing and/or showing any Mobile app
            material; using this Mobile app in any way that is or may be
            damaging to this Mobile app; using this Mobile app in any way that
            impacts user access to this Mobile app; using this Mobile app
            contrary to applicable laws and regulations, or in any way may cause
            harm to the Mobile app, or to any person or business entity;
            engaging in any data mining, data harvesting, data extracting or any
            other similar activity in relation to this Mobile app; using this
            Mobile app to engage in any advertising or marketing.
          </Text>
          <Text>
            Certain areas of this Mobile app are restricted from being access by
            you and Whisper social may further restrict access by you to any
            areas of this Mobile app, at any time, in absolute discretion. Any
            user ID and password you may have for this Mobile app are
            confidential and you must maintain confidentiality as well.
          </Text>
          <Text>Your Content</Text>
          <Text>
            In these Mobile app Standard Terms and Conditions, "Your Content"
            shall mean any audio, video text, images or other material you
            choose to display on this Mobile app. By displaying Your Content,
            you grant Whisper social a non-exclusive, worldwide irrevocable, sub
            licensable license to use, reproduce, adapt, publish, translate and
            distribute it in any and all media.
          </Text>
          <Text>
            Your Content must be your own and must not be invading any
            third-party's rights. Whisper social reserves the right to remove
            any of Your Content from this Mobile app at any time without notice.
          </Text>
          <Text>No warranties</Text>
          <Text>
            This Mobile app is provided "as is," with all faults, and Whisper
            social express no representations or warranties, of any kind related
            to this Mobile app or the materials contained on this Mobile app.
            Also, nothing contained on this Mobile app shall be interpreted as
            advising you.
          </Text>
          <Text>Limitation of liability</Text>
          <Text>
            In no event shall Whisper social, nor any of its officers, directors
            and employees, shall be held liable for anything arising out of or
            in any way connected with your use of this Mobile app whether such
            liability is under contract. Whisper social, including its officers,
            directors and employees shall not be held liable for any indirect,
            consequential or special liability arising out of or in any way
            related to your use of this Mobile app.
          </Text>
          <Text>Indemnification</Text>
          <Text>
            You hereby indemnify to the fullest extent Whisper social from and
            against any and/or all liabilities, costs, demands, causes of
            action, damages and expenses arising in any way related to your
            breach of any of the provisions of these Terms.
          </Text>
          <Text>Severability</Text>
          <Text>
            If any provision of these Terms is found to be invalid under any
            applicable law, such provisions shall be deleted without affecting
            the remaining provisions herein.
          </Text>
          <Text>Variation of Terms</Text>
          <Text>
            Whisper social is permitted to revise these Terms at any time as it
            sees fit, and by using this Mobile app you are expected to review
            these Terms on a regular basis.
          </Text>
          <Text>Assignment</Text>
          <Text>
            The Whisper social is allowed to assign, transfer, and subcontract
            its rights and/or obligations under these Terms without any
            notification. However, you are not allowed to assign, transfer, or
            subcontract any of your rights and/or obligations under these Terms.
          </Text>
          <Text>Entire Agreement</Text>
          <Text>
            These Terms constitute the entire agreement between Whisper social
            and you in relation to your use of this Mobile app, and supersede
            all prior agreements and understandings.
          </Text>
          <Text>Governing Law & Jurisdiction</Text>
          <Text>
            These Terms will be governed by and interpreted in accordance with
            the laws of the State of sa, and you submit to the non-exclusive
            jurisdiction of the state and federal courts located in sa for the
            resolution of any disputes.
          </Text>
        </View>
      )}
    </ScrollView>
  )
}
