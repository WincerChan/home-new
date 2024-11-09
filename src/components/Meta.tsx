import { Meta, MetaProvider, Title } from "@solidjs/meta";

const MetaTags = () => {
  return (
    <MetaProvider>
      <Title>Wincer</Title>
      <Meta
        name="description"
        content="IT craftsman ( Developer, Designer, Blogger )"
      />
      <Meta property="og:title" content="Wincer" />
      <Meta
        property="og:description"
        content="IT craftsman ( Developer, Designer, Blogger )"
      />
      <Meta property="og:type" content="website" />
      <Meta property="og:url" content="https://itswincer.com" />
      <Meta
        property="og:image"
        content="https://ae02.alicdn.com/kf/Aeadf9a8f9b1246a580924fc003e514c8E.jpg"
      />
      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:title" content="Wincer" />
      <Meta
        name="twitter:description"
        content="IT craftsman ( Developer, Designer, Blogger )"
      />
      <Meta
        name="twitter:image"
        content="https://ae02.alicdn.com/kf/Aeadf9a8f9b1246a580924fc003e514c8E.jpg"
      />
    </MetaProvider>
  );
};

export default MetaTags;
