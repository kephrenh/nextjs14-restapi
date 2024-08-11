import AuthForm from "@/components/AuthForm";

const RegisterPage = () => {
  return (
    <div>
      <AuthForm type="signup" signInForm={false} />
    </div>
  );
};
export default RegisterPage;
