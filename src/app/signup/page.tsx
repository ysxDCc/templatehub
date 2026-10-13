import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="flex min-h-[calc(100vh-160px)] items-center justify-center px-4 py-16 bg-[#09090b]">
      <SignUp routing="hash" />
    </div>
  );
}
