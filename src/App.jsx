import "./App.css";
import CRTWarp from "./component/CRTWarp";
import Shuffle from './component/Shuffle';
import Lanyard from "./component/Lanyard";

function App() {
  return (
    <main>
      <section className="hero">
        {/*Backgroud will go here*/}
        <div className="hero-background">
          <CRTWarp
            color="#c755f7"
            backgroundColor="#08080f"
            speed={0.5}
            curvature={0.25}
            scanlineStrength={0.6}
            bloom={1.5}
            mouseReact={false}
            changeOnClick={false}
          />
        </div>
        
        {/*Lanyard left side alignment code */}
        <div className="hero-lanyard">
          <div className="hero-lanyard">
            <Lanyard
              frontImage="/images/lanyard-front.png"
              orientation="portrait"
              imageFit="contain"
              size={0.70}
            />
</div>
        </div>

        <div className="hero-content">
          <h1>
            <Shuffle
              text="Carnell Butler"
              tag="span"
              textAlign="center"
              effect="blur"
              shuffleDirection="up"
              duration={1.5}
              animationMode="center"
              shuffleTimes={14}
              ease="expo.out"
              stagger={0.06}
              threshold={0.1}
              triggerOnce={true}
              triggerOnHover
              hoverRadius={0}
              motionBlur={false}
              respectReducedMotion={false}
              maxDelay={0}
              scrambleCharset="0123456789#%&*+=?"
              loop={false}
              loopDelay={0}
            />
          </h1>

          <p>
            Introduction text
          </p>
        </div>
      </section>
    </main>
  );
}
export default App;

