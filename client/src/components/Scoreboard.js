import React from "react";
import { nanoid } from "nanoid";
// import { allPlayersDrafted } from "../helpers/draftData";
// import useFilterPlayers from "../helpers/useFilterPlayers";
import useEventsQuery from "../queries/useEventsQuery";
import { useEventDetails } from "../helpers/useEventDetails";

export default function Scoreboard({ event }) {
  console.log("Scoreboard -> event", event);
  const eventsQuery = useEventsQuery();

  const eventDetails = useEventDetails(eventsQuery, event);
  console.log("Scoreboard -> eventDetails", eventDetails);

  // const eventDetails = eventsQuery?.data?.events;
  // most recent event will be at index[0]
  // const eventPlayers = eventQuery?.data.events[0].players;
  // const filteredResults = useFilterPlayers(eventPlayers, allPlayersDrafted);
  // console.log("Scoreboard -> filteredResults", filteredResults);

  return eventsQuery.isLoading ? (
    "loading"
  ) : eventsQuery.isError ? (
    "error"
  ) : (
    <ul className='league-scoreboard container'>
      <h5>{eventDetails[0].name}</h5>
      {eventDetails[0].players.map((golfer) => {
        return (
          <div key={nanoid()} className='round-details-horizontal'>
            <div className='main-details'>
              <h5>
                {golfer.status} {golfer.name} {golfer.score}
              </h5>
              <p>total: {golfer.strokes}</p>
              <p>
                today: {golfer.today || "__"} thru: {golfer.hole || "__"}
              </p>
            </div>
            <div className='round-details-vert'>
              <p>R1: {golfer.rounds[0]}</p>
              <p>R2: {golfer.rounds[1]}</p>
              <p>R3: {golfer.rounds[2]}</p>
              <p>R4: {golfer.rounds[3]}</p>
            </div>
          </div>
        );
      })}
    </ul>
  );
  // </>
  //   ) :
  //       (
  //   `most recent golf data is ${eventQuery.data.events[0].name}`
  // );
}
