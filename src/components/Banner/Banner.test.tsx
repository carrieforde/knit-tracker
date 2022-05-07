import { render, screen } from "@testing-library/react";
import { Banner, BannerProps, Variant } from "./Banner";

function renderBanner(props: Pick<BannerProps, "variant">) {
  return render(<Banner {...props}>Banner content</Banner>);
}

function assertBanners() {
  const bannerTypes: { variant: Variant; testId: string }[] = [
    { variant: "error", testId: "bannerErrorIcon" },
    { variant: "info", testId: "bannerInfoIcon" },
    { variant: "success", testId: "bannerSuccessIcon" },
    { variant: "warning", testId: "bannerWarningIcon" },
  ];

  bannerTypes.forEach(({ variant, testId }) => {
    it(`should render an ${variant} banner`, () => {
      renderBanner({ variant });
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });
  });
}

describe("Banner", () => {
  it("should return null when a variant isn't specified", () => {
    const { container } = renderBanner({} as BannerProps);

    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toBeNull();
  });

  assertBanners();
});
