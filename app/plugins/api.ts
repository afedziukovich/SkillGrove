export default defineNuxtPlugin(() => {
  const token = useCookie<string | null>('token');

  const api = $fetch.create({
    onRequest({ options }) {
      const headers = new Headers(options.headers || {});

      if (token.value) {
        headers.set('Authorization', `Bearer ${token.value}`);
      }

      options.headers = headers;
    },
  });

  return {
    provide: {
      api,
    },
  };
});
