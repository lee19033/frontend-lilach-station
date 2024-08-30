
import { useSelector} from "react-redux";

export function StationInfo()  {

    const station = useSelector(storeState => storeState.stationModule.station);

    function TextWithLinks({ text }) {
        if (!text) return null; 
        // Remove double quotes from the beginning and end of the text
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const replacedText = text?.replace(urlRegex, '<p><a href="$1" target="_blank"style="color: white; text-decoration: underline;" >$1</a></p>');

        //return replacedText;

    // Render the HTML
    return <div className="station-info-data text" dangerouslySetInnerHTML={{ __html: replacedText }} />;
    }

    return (
    
        <div className='station-info scrollable-element'>
            {/* Your component content goes here */}
            {station?.songs && 
                <div>
                    <img src={station.songs[0]?.snippet?.thumbnails?.high?.url} alt={station.name}  />
                    <div>
                    <TextWithLinks text={station.songs[0]?.snippet?.description.replace('""','')} />
                    </div>
                </div>
             } 
        </div>
    );
}