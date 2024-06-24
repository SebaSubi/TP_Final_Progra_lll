"use client";

import { useRef, useState, useEffect, use } from "react";
import Character from "./character";
import MarkPosition from "./unitPositioner";

export default function Unit() {
  const unitPosition = useRef({ x: 500, y: 500 });
  const [unitMarker, setUnitMarker] = useState(false);
  const poisitionToMove = useRef({ x: 0, y: 0 });

  useEffect(() => {
    moveRandomUnit(400, {
      x: window.innerWidth / 2,
      y: 350,
    });
  }, []);

  function getNewPosition() {
    let clicks = 0;
    const clickToMove = () => {
      clicks += 1;
      //funcion de que cuando se haga click que se mande al creeper a algun lugar
      if (clicks === 2) {
        window.removeEventListener("click", clickToMove);
        window.removeEventListener("mousemove", getMousePosition);
        moveCreeper(poisitionToMove.current);
        setUnitMarker(false);
      }
    };

    const getMousePosition = (event: MouseEvent) => {
      //function that saves the cursor position
      poisitionToMove.current = { x: event.clientX, y: event.clientY };
    };
    window.addEventListener("mousemove", getMousePosition);
    window.addEventListener("click", clickToMove);
  }

  function moveCreeper(newposition: { x: number; y: number }) {
    // const newposition = {
    //   x: Math.floor(Math.random() * window.innerWidth),
    //   y: Math.floor(Math.random() * window.innerHeight),
    // };

    let positionToChange = { ...unitPosition.current };
    const moveStepByStep = () => {
      if (newposition.x != unitPosition.current.x) {
        newposition.x < unitPosition.current.x
          ? positionToChange.x--
          : positionToChange.x++;
      }
      if (newposition.y != unitPosition.current.y) {
        newposition.y < unitPosition.current.y
          ? (positionToChange.y -= 0.5)
          : (positionToChange.y += 0.5);
      }
      unitPosition.current = positionToChange; //as we're no loger using a useefect this could maybe just be replaced

      // If the unit has arrived at its destination, clear the interval
      if (
        newposition.x == unitPosition.current.x &&
        newposition.y == unitPosition.current.y
      ) {
        clearInterval(intervalId);
      }
    };
    // Start moving the Creeper every second
    const intervalId = setInterval(moveStepByStep, 5);
  }
  function moveRandomUnit(radius: number, center: { x: number; y: number }) {
    unitPosition.current.x = center.x;
    unitPosition.current.y = center.y + radius / 2;

    const moveInCircle = () => {
      const rndNumber = Math.random();
      if (rndNumber >= 0.5) {
        //we take a random number to see if we should go right or left

        //in this case we go right if its posible, if its not posible to go right we'll go upwards
        if (unitPosition.current.y === center.y + radius / 2) {
          //1
          //we're comparing if the unit is in the bottom part of the rombus
          // unitPosition.current.x += radius / 2; //this is made this way so we have an angled rombus
          // unitPosition.current.y -= radius;
          moveCreeper({
            x: unitPosition.current.x + radius,
            y: unitPosition.current.y - radius / 2,
          });
        } else {
          //if the conditional goes this way it either means that the unit is in the top part of the rombus or in one of the sides.
          if (unitPosition.current.y === center.y - radius / 2) {
            //2
            //now im asking if the unit is in the top part of the rombus
            // unitPosition.current.x += radius / 2; //this is made this way so we have an angled rombus
            // unitPosition.current.y += radius;
            moveCreeper({
              x: unitPosition.current.x + radius,
              y: unitPosition.current.y + radius / 2,
            });
          } else {
            //if the second conditional goes this way it  means that the unit is located in one of the sides of the rombus
            if (unitPosition.current.x === center.x + radius) {
              //3
              //if this is true it would mean that the troop is in the right side of the rombus, and that we should send it upwards
              // unitPosition.current.x -= radius / 2; //this is made this way so we have an angled rombus
              // unitPosition.current.y += radius;
              moveCreeper({
                x: unitPosition.current.x - radius,
                y: unitPosition.current.y - radius / 2,
              });
            } else {
              // unitPosition.current.x += radius / 2; //this is made this way so we have an angled rombus
              // unitPosition.current.y += radius;
              moveCreeper({
                x: unitPosition.current.x + radius,
                y: unitPosition.current.y + radius / 2,
              });
            }
          }
        }
      } else {
        //in this case we go left if its posible, if its not posible to go left we'll go upwards

        if (unitPosition.current.y === center.y + radius / 2) {
          //we're comparing if the unit is in the bottom part of the rombus
          // unitPosition.current.x -= radius / 2; //this is made this way so we have an angled rombus
          // unitPosition.current.y -= radius;
          moveCreeper({
            x: unitPosition.current.x - radius,
            y: unitPosition.current.y - radius / 2,
          });
        } else {
          //if the conditional goes this way it either means that the unit is in the top part of the rombus or in one of the sides.
          if (unitPosition.current.y === center.y - radius / 2) {
            //now im asking if the unit is in the top part of the rombus
            // unitPosition.current.x -= radius / 2; //this is made this way so we have an angled rombus
            // unitPosition.current.y += radius;
            moveCreeper({
              x: unitPosition.current.x - radius,
              y: unitPosition.current.y + radius / 2,
            });
          } else {
            //if the second conditional goes this way it  means that the unit is located in one of the sides of the rombus
            if (unitPosition.current.x === center.x + radius) {
              //if this is true it would mean that the troop is in the right side of the rombus, and that we should send it upwards
              // unitPosition.current.x -= radius / 2; //this is made this way so we have an angled rombus
              // unitPosition.current.y += radius;
              moveCreeper({
                x: unitPosition.current.x - radius,
                y: unitPosition.current.y + radius / 2,
              });
            } else {
              // unitPosition.current.x += radius / 2; //this is made this way so we have an angled rombus
              // unitPosition.current.y += radius;
              moveCreeper({
                x: unitPosition.current.x + radius,
                y: unitPosition.current.y - radius / 2,
              });
            }
          }
        }
      }
    };
    const movement = setInterval(moveInCircle, 4000);
  }

  return (
    <>
      {/* <button
        // onClick={() => {
        //   if (unitMarker) {
        //     setUnitMarker(false);
        //   } else {
        //     setUnitMarker(true);
        //     getNewPosition();
        //   }
        // }}

      //   onClick={() => moveRandomUnit(200, { x: 500, y: 500 })}
      // >
      //   start walk
      </button> */}
      <Character reference={unitPosition} />
      {unitMarker && <MarkPosition />}
    </>
  );
}
