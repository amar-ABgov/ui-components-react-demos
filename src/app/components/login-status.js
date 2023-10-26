"use client";

import { GoAButton, GoACircularProgress, GoAContainer } from "@abgov/react-components";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";

async function keycloakSessionLogOut() {
  try {
    await fetch(`/api/auth/logout`, { method: "GET" });
  } catch (err) {
    console.error(err);
  }
}

export default function LoginStatus() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (
      status != "loading" &&
      session &&
      session?.error === "RefreshAccessTokenError"
    ) {
      signOut({ callbackUrl: "/" });
    }
  }, [session, status]);
  return (
    <GoAContainer accent="thin" type="interactive" mt="2xl" mb="2xl">
      {status === "loading" && !session && (
        <GoACircularProgress message="Loading..." visible={true} />
      )}
      {!!session && (
        <>
          <h2>
            Logged in as{" "}
            <span>{session.user.email}</span>{" "}
          </h2>
          <GoAButton type="secondary"

            onClick={() => {
              keycloakSessionLogOut().then(() => signOut({ callbackUrl: "/" }));
            }}
          >
            Log out
          </GoAButton>
        </>
      )}
      {status != "loading" && !session && (
        <GoAButton type="primary"
          onClick={() => signIn("keycloak")}
        >
          Log in
        </GoAButton>
      )}
    </GoAContainer>
  );
}
