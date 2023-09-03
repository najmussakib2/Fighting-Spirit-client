import { Link } from "react-router-dom";


const Hero2 = () => {
    return (
        <div>
           
            <div className="hero min-h-screen ">
                
                <div className="hero-content flex-col-reverse lg:flex-row justify-between">
                    <div>
                        
                        <div className="collapse ">
                            <input type="checkbox" />  
                            <div className="collapse-title text-xl text-gray-500 font-medium">
                                Who are you?
                            </div>
                            <div className="collapse-content text-gray-500"> 
                                <p>Fighting Spirit is a family run business based in Bangladesh with over 5 years of experience in the martial art industry.<br/> We are now established as one of the leading trainers of martial art.</p>
                            </div>
                        </div>
                        <div className="collapse ">
                            <input type="checkbox" />  
                            <div className="collapse-title text-xl text-gray-500 font-medium">
                                Why should I enroll here?
                            </div>
                            <div className="collapse-content text-gray-500"> 
                                <p>We strive to provide an honest, fair and easy online enroll environment. Our site has been designed to put you first making it easy to find what you want.<br/>We constantly monitor our competitor's prices to provide you with the cheapest delivered price available. We are quite happy for you to 'check-out' the competition as this, very often, highlights just how good our prices are.</p>
                            </div>
                        </div>
                        <div className="collapse ">
                            <input type="checkbox" />  
                            <div className="collapse-title text-xl text-gray-500 font-medium">
                                Is the courses sits are limited?
                            </div>
                            <div className="collapse-content text-gray-500"> 
                                <p>Yes! because we need to maintain our training quality and focus on each and every students growth. every student is important to us! thats why we limited our sits so we can focus on our every students. Time is very short so you need to enroll quickly!</p>
                            </div>
                        </div>
                        <div className="collapse ">
                            <input type="checkbox" />  
                            <div className="collapse-title text-gray-500 text-xl font-medium">
                                How can I pay?
                            </div>
                            <div className="collapse-content text-gray-500"> 
                                <p>We accept payment via credit or debit card, PayPal, or bank transfer.</p>
                            </div>
                        </div>
                        <div className="collapse ">
                            <input type="checkbox" /> 
                            <div className="collapse-title text-xl font-medium text-gray-500">
                                Is my payment secure?
                            </div>
                            <div className="collapse-content text-gray-500"> 
                                <p>Absolutely, all card payments are processed using stripe Pay. Stripe Pay is a one of the largest independent Payment Service Provider in the BD and operate to the highest level of compliance under the Payment Card Industry Data Security Standard (PCI). They take responsibility for capturing and storing card details on their secure servers. For further information on Stripe Pay services & security please go to www.stripepay.com.</p>
                            </div>
                        </div>
                       
                    </div>
                    <div>
                    {/* <Link to={"/"}><iframe src="https://giphy.com/embed/3odxflN8NqzeSIRyvb" width="270" height="480"  allowFullScreen></iframe></Link> */}
                    <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3liOXBiMG1qaDd4NnN4ZWJ3dnpucWd1a3lmN2E1NmZvZWdxbGc4MiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/3odxflN8NqzeSIRyvb/giphy.gif"className="w-[1000px] h-[500px]" alt="" />
                   </div>
                </div>
            </div>
        </div>
    );
};

export default Hero2;