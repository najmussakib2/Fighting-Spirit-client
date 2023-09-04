

const EndSection = () => {
    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5 p-10 rounded  mb-10 bg-green-300" >
                <section className="text-center">
                    <img src="https://www.blackbeltathome.com/wp-content/uploads/learn_icon_269230.png" className="ml-7" alt="" />
                    <h1 className="text-3xl text-gray-700 pb-4">LEARN</h1>
                    <p className="text-gray-700">Our complete white-to-black belt courses were designed with you in mind. Perfect for training at home for personal learning, or for earning rank.</p>
                </section>
                <section className="text-center">
                    <img src="https://www.blackbeltathome.com/wp-content/uploads/train_icon_269230.png" className="ml-7" alt=""  />
                    <h1 className="text-3xl text-gray-700 pb-4">TRAIN</h1>
                    <p className="text-gray-700">Follow along with easy to learn from video lessons and follow along classes. Watch on any phone, computer, or TV.</p>
                </section>
                <section className="text-center">
                    <img src="https://www.blackbeltathome.com/wp-content/uploads/rank_icon_269230.png" className="ml-5" alt="" />
                    <h1 className="text-3xl text-gray-700 pb-4">EARN RANK</h1>
                    <p className="text-gray-700">Log hours, complete your assignments, and submit your video exam. Your instructor will grade and then give you detailed feedback.</p>
                </section>
            </div>
        </div>
    );
};

export default EndSection;