"use client";
//imports
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

export default function ZoomableComponet() {
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <TransformWrapper
          maxScale={3}
          defaultScale={0}
          defaultPositionX={0}
          defaultPositionY={0}
          minScale={0.5}
        >
          {({ zoomIn, zoomOut, ...rest }) => (
            <>
              <button
                onClick={() => {
                  zoomIn(1);
                }}
              >
                Zoom In
              </button>
              <button
                onClick={() => {
                  zoomIn(-1);
                }}
              >
                ZoomOut
              </button>
              <TransformComponent>
                <div className="bg-white h-36 w-36 border-b-green-950 flex items-center justify-center">
                  <h1 className="text-black">zoom here</h1>
                </div>
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
        <div className="flex items-center place-content-between">
          {/* <TransformWrapper
            maxScale={10}
            defaultScale={1}
            defaultPositionX={0}
            defaultPositionY={0}
            >
            {({zoomIn, zoomOut, ...rest}) => (
                <>
                <button className="">+ zoom</button>
                <button>- zoom</button>
                </>
            )}
            </TransformWrapper> */}
        </div>
      </div>
    </>
  );
}
