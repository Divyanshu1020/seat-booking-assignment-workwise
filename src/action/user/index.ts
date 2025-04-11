import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const onCurrentUser = async () => {
    const userDataClerk = await currentUser();
  
    if (!userDataClerk) {
  
      return redirect("/sign-in");
    }
  
    return userDataClerk;
  };

