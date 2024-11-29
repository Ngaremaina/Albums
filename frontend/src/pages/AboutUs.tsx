import Layout from "../layout/Layout";

function AboutUs(){
    return(
        <Layout>
            <section id="features" className="py-16">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-semibold mb-4">What is Momentos?</h2>
                    <p className="text-lg mb-8">Momentos is your ultimate album management app that allows you to effortlessly explore albums and view pictures.</p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-3">Explore Albums</h3>
                        <p className="text-gray-700">Browse through a collection of albums created by you or others. With our intuitive interface, finding the perfect album has never been easier.</p>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-3">View Pictures</h3>
                        <p className="text-gray-700">Inside each album, explore all the images in full resolution. Whether it's a vacation or a special event, all your pictures are neatly organized for easy viewing.</p>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-3">Create &amp; Manage</h3>
                        <p className="text-gray-700">Create new albums, upload photos, and manage your collection. The app helps you stay organized with custom tags and categorization features.</p>
                    </div>
                    </div>
                </div>
            </section>
        </Layout>

    )
}

export default AboutUs;