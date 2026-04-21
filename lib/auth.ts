// Minimal placeholder for auth utilities
export function getAuthUser(req?: any) {
  return { user: { email: "", id: "" } };
}

export function unauthorized() {
  return new Response("Unauthorized", { status: 401 });
}
