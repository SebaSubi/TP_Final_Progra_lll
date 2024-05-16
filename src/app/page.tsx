
import Image from "next/image";
// import GoldMine from "./components/GoldMine";
//import SideNav from "./construccion/mode/constructionBar";

export default function Home() {
  const images = [I1, I2, I3, I4]
  const [currentIndex, setCurrentIndex] = useState(0);
  //const { boosts, setBoosts } = useContext(CollectorContext);

  useEffect(() => {
      const intervalId = setInterval(() => {
          setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
      }, 3000)
      
      return () => clearInterval(intervalId);
  }, [])

  const [collectorData, setCollectorData] = useState<CollectorData>({
    workersAssigned: 0,
    extractionCapacity: 0,
    production: 0,
    improvements: 0,
  });

  const myCollector: Collectors = {
    type: 'wood',
    workersAssigned: 10,
    maxWorkers: 15,
  };

  const onUpdateCollector = (updatedCollector: Collectors) => {
    //console.log(updatedCollector);
  };
  
  //console.log(boosts);
  const callback = (data: CollectorData) => {
    setCollectorData(data);
  };

  const collectorResult = collector({ collector: myCollector, onUpdateCollector, callback });

  /*
  useEffect(() => {
    const intervalId = setInterval(() => {
      collectorResult.improveExtractionCapacity();
    }, 600);

    return () => clearInterval(intervalId);
  }, [collectorResult]);
  */

  /*
  const onBoostClick = () => {
    if (boosts > 0) {
      setCollectorData(prevData => ({
        ...prevData,
        production: prevData.production * boosts,
      }));
      setBoosts(prevBoosts => prevBoosts - 1);
    }
  };
  */

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24" 
          style={{ backgroundImage: `url(/background.png)`, backgroundSize: 'cover' }}>
      
    </main>
  );
}



