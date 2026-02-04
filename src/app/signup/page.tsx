import Link from "next/link";
import { Button } from "@/components/ui";
import { ArrowLeft } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-3xl font-bold font-display text-surface-50 mb-2">
          Get Early Access
        </h1>
        <p className="text-surface-400 mb-8">
          This page is a placeholder. Registration coming soon.
        </p>
        <div className="p-8 rounded-2xl glass border border-white/5 mb-8">
          <p className="text-sm text-surface-500 mb-6">
            Sign up form will be implemented here.
          </p>
          <Button disabled className="w-full">
            Join Waitlist (Coming Soon)
          </Button>
        </div>
        <Link href="/" className="inline-flex items-center gap-2 text-surface-400 hover:text-surface-200 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>
      </div>
    </div>
  );
}
