import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignInCard } from "./_components/sign-in/card";
import { CreateAccountCard } from "./_components/create-account/card";

export const HomePage = () => {
  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="font-bold text-3xl mb-2 text-yellow-600">📝 TodoApp</h1>
        <p className="text-sm glovo-text">
          Sign in to manage your tasks efficiently
        </p>
      </div>
      <Tabs defaultValue="signIn">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="signIn">Sign In</TabsTrigger>
          <TabsTrigger value="createAccount">Create Account</TabsTrigger>
        </TabsList>
        <TabsContent value="signIn">
          <SignInCard />
        </TabsContent>
        <TabsContent value="createAccount">
          <CreateAccountCard />
        </TabsContent>
      </Tabs>
    </div>
  );
};
