import { useRef } from "react";
import { Input } from "../components/Input";

export function Signup() {
  const usernameRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <h1 className="text-3xl font-bold mb-8 text-center">Sign Up</h1>
      <form className="grid grid-cols-[auto,1fr] gap-x-3 gap-y-5 items-center justify-items-end">
        <label htmlFor="userName">Username</label>
        <Input id="userName" pattern="\S*" required ref={usernameRef} />
      </form>
    </>
  );
}
