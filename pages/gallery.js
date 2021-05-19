import Layout from "../components/layout";
import LightBoxGallery from "../components/lightBoxGallery";

import { getAllImages } from "../lib/images";

export default function Gallery({ allImages } = props) {
  return (
    <Layout>
      <main>
        <LightBoxGallery photos={allImages}></LightBoxGallery>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const allImages = getAllImages();
  return {
    props: {
      allImages,
    },
  };
}
