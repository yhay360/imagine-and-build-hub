import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";

const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/");
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">
          مرحباً بك في تطبيق المهام
        </h1>
        <SupabaseAuth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#404040',
                  brandAccent: '#262626',
                },
              },
            },
            style: {
              button: {
                borderRadius: '6px',
                height: '40px',
              },
              input: {
                borderRadius: '6px',
                height: '40px',
              },
              anchor: {
                color: '#404040',
              },
              message: {
                borderRadius: '6px',
              },
            },
          }}
          localization={{
            variables: {
              sign_in: {
                email_label: 'البريد الإلكتروني',
                password_label: 'كلمة المرور',
                button_label: 'تسجيل الدخول',
                loading_button_label: 'جاري تسجيل الدخول...',
                link_text: 'لديك حساب بالفعل؟ تسجيل الدخول',
              },
              sign_up: {
                email_label: 'البريد الإلكتروني',
                password_label: 'كلمة المرور',
                button_label: 'إنشاء حساب',
                loading_button_label: 'جاري إنشاء الحساب...',
                link_text: 'ليس لديك حساب؟ إنشاء حساب جديد',
              },
              magic_link: {
                button_label: 'إرسال رابط السحري',
                loading_button_label: 'جاري إرسال الرابط...',
              },
              forgotten_password: {
                button_label: 'إرسال تعليمات إعادة تعيين كلمة المرور',
                loading_button_label: 'جاري الإرسال...',
                link_text: 'نسيت كلمة المرور؟',
              },
            },
          }}
          providers={[]}
        />
      </div>
    </div>
  );
};

export default Auth;