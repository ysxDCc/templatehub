import { SignIn } from '@clerk/nextjs';

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-160px)] items-center justify-center px-4 py-16 bg-[#09090b]">
      <SignIn routing="hash" />
    </div>
  );
}
