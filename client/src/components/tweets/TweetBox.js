import React, { useEffect } from "react";
import './TweetBox.css';

function TweetBox() {

    //Make an api call to get all CoC tweets
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        document.getElementsByClassName("twitter-embed")[0].appendChild(script);
    }, []);

    return(
        <div className="TweetBoxWrapper col-lg-3">
            <div className="TweetBox">
            <section className="twitterContainer">
                <div className="twitter-embed">
                    <a
                    className="twitter-timeline"
                    data-theme="light"
                    data-tweet-limit="5"
                    data-chrome="noheader nofooter noborders"
                    href="https://twitter.com/gtcomputing"
                    >
                    Tweets by GTComputing
                    </a>
                </div>
            </section>
            </div>
        </div>
    );

}

export default TweetBox;