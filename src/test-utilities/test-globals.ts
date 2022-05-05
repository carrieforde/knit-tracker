const oldWindowLocation: string | undefined = undefined;

export function setNewLocation(url?: URL) {
  Reflect.deleteProperty(window, "location");
  window.location = url as unknown as Location;
  return window.location ?? oldWindowLocation;
}

export function mockGlobalVariable(key: string, value: unknown): void {
  const originalDescriptor = Object.getOwnPropertyDescriptor(window, key);

  Reflect.deleteProperty(window, key);

  beforeAll(() => {
    Object.defineProperty(window, key, {
      configurable: true,
      writable: true,
      value,
    });
  });

  afterAll(() => {
    Object.defineProperty(
      window,
      key,
      originalDescriptor as PropertyDescriptor
    );
  });
}
