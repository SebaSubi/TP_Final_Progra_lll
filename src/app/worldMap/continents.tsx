"use client";

import React, { useState, useEffect, useRef } from "react";
import { getContinents, postUserInstance } from "./continentLogic";
import { useSession } from "next-auth/react";

//we have to makie a function that returns the instance of the continent but inside of the contintent component
export function Africa() {
  const [fillColor, setFillColor] = useState("#50711eee");
  const continentOcupied = useRef(false);
  const { data: session } = useSession();

  const fetchContinent = async () => {
    const getUsersInstances = await getContinents();
    // console.log(getUsersInstances);
    if (getUsersInstances) {
      const continentInstance = getUsersInstances.find(
        (instance: any) => instance.country === "Africa"
      );
      if (continentInstance) {
        continentOcupied.current = true;
      }
    }
  };

  useEffect(() => {
    fetchContinent();
  }, []);

  const handleMouseEnter = () => {
    fetchContinent();
    if (continentOcupied.current === true) {
      setFillColor("#F56565"); //red color
    } else {
      setFillColor("#7e9f3b"); //liter green color
    }
  };

  function selectContinent() {
    fetchContinent();
    if (continentOcupied.current === false) {
      postUserInstance(
        (session?.user as any)?._id,
        (session?.user as any)?.fullname,
        1,
        "Africa",
        [],
        [],
        500,
        []
      );
    }
    setFillColor("#F56565"); //red color
    fetchContinent();
  }

  const handleMouseLeave = () => {
    setFillColor("#50711eee");
  };

  return (
    <a
      onMouseOver={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => selectContinent()}
    >
      <path
        fill={fillColor}
        stroke="#C9A259"
        strokeWidth={5}
        d="M2797 1912 l-118 -27 -57 -65 c-55 -63 -58 -70 -85 -181 l-28 -116
            58 -77 c63 -83 66 -84 151 -62 44 12 71 13 145 4 51 -6 94 -12 96 -14 2 -2 -7
            -19 -19 -39 l-22 -35 48 -83 c26 -45 53 -91 60 -102 12 -18 9 -25 -26 -67
            l-40 -46 46 -163 c26 -90 48 -166 50 -168 2 -2 21 10 43 27 l38 31 29 -30 c15
            -16 33 -29 38 -29 6 0 53 91 104 201 l92 201 -30 50 -31 49 106 151 c58 82
            103 153 100 158 -3 4 -39 11 -80 15 l-76 7 -88 175 -87 176 -101 -2 -101 -2
            -37 45 c-21 26 -42 46 -49 45 -6 0 -64 -13 -129 -27z"
      />
      <path
        fill={fillColor}
        stroke="#C9A259"
        strokeWidth={5}
        d="M3555 1078 c-12 -85 -16 -93 -45 -110 -27 -16 -30 -22 -30 -71 0 -30
            -7 -71 -15 -90 -8 -20 -15 -41 -15 -47 0 -6 25 -10 59 -10 l59 0 36 104 c33
            96 35 107 22 138 -7 18 -21 54 -30 81 -10 26 -21 47 -26 47 -5 0 -11 -19 -15
            -42z"
      />
    </a>
  );
}

export function NorthAmerica() {
  const [fillColor, setFillColor] = useState("#50711eee");
  const continentOcupied = useRef(false);
  const { data: session } = useSession();

  const fetchContinent = async () => {
    const getUsersInstances = await getContinents();
    if (getUsersInstances) {
      const continentInstance = getUsersInstances.find(
        (instance: any) => instance.country === "North_America"
      );
      if (continentInstance) {
        continentOcupied.current = true;
      }
    }
  };

  useEffect(() => {
    fetchContinent();
  }, []);

  const handleMouseEnter = () => {
    fetchContinent();
    if (continentOcupied.current === true) {
      setFillColor("#F56565"); //red color
    } else {
      setFillColor("#7e9f3b"); //liter green color
    }
  };

  function selectContinent() {
    fetchContinent();
    if (continentOcupied.current === false) {
      postUserInstance(
        (session?.user as any)?._id,
        (session?.user as any)?.fullname,
        1,
        "North_America",
        [],
        [],
        500,
        []
      );
    }
    setFillColor("#F56565"); //red color
    fetchContinent();
  }

  const handleMouseLeave = () => {
    setFillColor("#50711eee");
  };

  return (
    <a
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => selectContinent()}
    >
      <path
        fill={fillColor}
        stroke="#C9A259"
        strokeWidth={5}
        d="M2053 3377 l-251 -21 -12 -39 c-17 -58 -51 -87 -99 -87 -48 0 -54
            -13 -49 -105 l3 -60 101 -3 101 -3 79 -247 80 -247 76 -3 76 -3 18 81 c12 58
            21 80 33 82 9 0 21 2 28 2 7 1 30 18 51 39 28 28 46 37 71 37 22 0 47 11 75
            32 22 17 43 33 45 35 3 2 10 81 17 176 7 94 16 173 21 175 42 15 158 73 161
            80 2 8 -266 81 -353 96 -11 2 -133 -6 -272 -17z"
      />
      <path
        fill={fillColor}
        stroke="#C9A259"
        strokeWidth={5}
        d="M765 3103 c-52 -6 -63 -17 -40 -43 18 -20 18 -21 -3 -43 -30 -31 -28
            -38 18 -70 30 -21 48 -27 77 -24 32 3 38 8 41 31 2 14 7 26 11 26 4 0 22 13
            41 30 l35 29 -38 36 c-30 29 -41 34 -51 25 -10 -7 -16 -8 -21 0 -3 5 -12 9
            -18 8 -7 -1 -30 -3 -52 -5z"
      />
      <path
        fill={fillColor}
        stroke="#C9A259"
        strokeWidth={5}
        d="M1426 3001 c-4 -14 -19 -138 -21 -166 0 -6 34 -8 84 -6 l83 3 39 -38
            c22 -21 39 -41 39 -45 0 -4 -12 -22 -26 -39 -16 -18 -23 -35 -18 -40 5 -4 34
            -28 64 -53 l54 -45 83 75 c46 42 83 81 83 88 0 7 -22 27 -50 45 -54 35 -58 41
            -36 63 16 15 4 37 -20 37 -6 0 -37 20 -69 45 -85 65 -278 117 -289 76z"
      />
      <path
        fill={fillColor}
        stroke="#C9A259"
        strokeWidth={5}
        d="M1153 3003 c-29 -4 -33 -8 -33 -35 l0 -30 -36 27 -35 27 -47 -19
            c-43 -18 -47 -22 -47 -54 0 -32 2 -34 35 -37 40 -4 67 -22 33 -22 -37 0 -37
            -21 -2 -56 l34 -33 75 25 c41 13 92 26 113 29 48 7 47 19 -3 39 -22 9 -40 18
            -40 20 0 2 7 23 15 46 28 80 25 84 -62 73z"
      />
      <path
        fill={fillColor}
        stroke="#C9A259"
        strokeWidth={5}
        d="M242 2795 c-51 -29 -97 -56 -102 -61 -11 -11 123 -355 143 -368 11
            -7 53 2 142 29 l128 39 78 -84 c44 -47 109 -118 146 -158 l66 -73 -11 -76
            c-10 -75 -10 -78 15 -107 14 -17 88 -103 164 -191 l138 -160 206 -89 206 -89
            45 44 c24 24 44 49 44 55 0 11 -28 24 -142 65 -37 13 -38 14 -38 62 l0 48 -70
            -7 -70 -7 0 51 c0 61 2 62 125 62 l93 0 88 163 89 162 115 57 c63 31 119 59
            124 60 6 3 -136 233 -172 278 -2 3 -14 -8 -27 -25 -13 -16 -26 -27 -28 -25 -3
            3 -16 28 -31 57 -14 28 -30 54 -36 58 -6 3 -36 1 -66 -5 l-56 -12 7 -99 7 -99
            -54 0 -54 0 -17 69 -18 70 75 113 c42 62 76 119 76 126 0 9 -10 11 -32 8 -166
            -27 -177 -27 -249 -6 l-70 21 -80 -26 -79 -27 -94 37 -94 36 -101 -11 -100
            -12 -153 51 c-84 28 -160 51 -168 50 -8 -1 -57 -25 -108 -54z"
      />
      <path
        fill={fillColor}
        stroke="#C9A259"
        strokeWidth={5}
        d="M1642 1777 c-34 -11 -61 -25 -59 -31 2 -6 30 -15 63 -20 54 -8 62
            -12 99 -56 33 -41 46 -49 75 -49 19 -1 50 -10 68 -21 43 -26 47 -26 71 14 28
            44 27 46 -14 46 -29 0 -37 5 -45 26 -9 22 -14 25 -39 19 -25 -5 -33 -1 -57 30
            -15 20 -43 43 -62 51 -19 7 -35 13 -36 13 0 -1 -29 -11 -64 -22z"
      />
    </a>
  );
}

export function Asia() {
  const [fillColor, setFillColor] = useState("#50711eee");
  const continentOcupied = useRef(false);
  const { data: session } = useSession();

  const fetchContinent = async () => {
    const getUsersInstances = await getContinents();
    if (getUsersInstances) {
      const continentInstance = getUsersInstances.find(
        (instance: any) => instance.country === "Asia"
      );
      if (continentInstance) {
        continentOcupied.current = true;
      }
    }
  };

  useEffect(() => {
    fetchContinent();
  }, []);

  const handleMouseEnter = () => {
    fetchContinent();
    if (continentOcupied.current === true) {
      setFillColor("#F56565"); //red color
    } else {
      setFillColor("#7e9f3b"); //liter green color
    }
  };

  function selectContinent() {
    fetchContinent();
    if (continentOcupied.current === false) {
      postUserInstance(
        (session?.user as any)?._id,
        (session?.user as any)?.fullname,
        1,
        "Asia",
        [],
        [],
        500,
        []
      );
    }
    setFillColor("#F56565"); //red color
    fetchContinent();
  }

  const handleMouseLeave = () => {
    setFillColor("#50711eee");
  };

  return (
    <a
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => selectContinent()}
    >
      <path
        fill={fillColor}
        stroke="#C9A259"
        strokeWidth={5}
        d="M4110 3247 c-31 -11 -36 -17 -41 -57 -3 -25 -11 -57 -17 -71 -14 -34
            -6 -42 23 -23 19 12 36 13 89 6 36 -5 68 -6 71 -4 3 3 5 27 5 54 0 41 -3 48
            -19 48 -11 0 -29 14 -41 30 -24 34 -22 33 -70 17z"
      />
      <path
        fill={fillColor}
        stroke="#C9A259"
        strokeWidth={5}
        d="M4357 3193 c-4 -3 -7 -16 -7 -27 0 -12 -11 -38 -25 -58 -14 -20 -25
            -42 -25 -49 0 -15 129 -2 150 16 8 7 30 20 48 29 43 22 41 36 -6 36 -27 0 -50
            9 -78 30 -42 32 -47 34 -57 23z"
      />
      <path
        fill={fillColor}
        stroke="#C9A259"
        strokeWidth={5}
        d="M3774 3021 c-77 -22 -100 -34 -151 -78 -60 -52 -60 -53 -70 -125 -6
            -40 -9 -75 -7 -77 4 -4 156 18 162 23 2 3 -6 18 -18 34 l-22 30 25 34 c19 25
            44 40 95 57 65 23 71 27 81 61 13 43 14 70 4 69 -5 -1 -49 -13 -99 -28z"
      />
      <path
        fill={fillColor}
        stroke="#C9A259"
        strokeWidth={5}
        d="M4375 3023 c-11 -3 -29 -13 -40 -23 -12 -11 -60 -26 -115 -37 -90
            -18 -95 -20 -98 -45 -3 -24 -8 -27 -50 -30 l-47 -3 -3 -55 c-3 -55 -3 -56 -51
            -83 -57 -31 -71 -33 -71 -10 0 37 -23 143 -31 143 -4 0 -20 -16 -35 -35 -26
            -34 -26 -37 -15 -96 7 -34 14 -66 17 -73 2 -6 -28 -47 -66 -91 -53 -61 -70
            -87 -70 -110 0 -43 -46 -324 -54 -332 -4 -4 -39 -10 -79 -15 -58 -6 -76 -12
            -92 -31 -11 -13 -55 -67 -98 -120 -69 -85 -83 -98 -116 -103 -60 -10 -65 -16
            -51 -58 6 -19 15 -38 20 -41 4 -3 27 2 51 10 52 19 44 28 124 -125 l59 -110
            80 0 c45 0 86 4 92 8 14 9 54 87 54 105 0 9 -28 23 -76 37 -60 18 -77 27 -85
            47 -14 37 -11 49 15 61 22 10 27 7 49 -26 23 -36 26 -37 88 -40 100 -4 160
            -13 164 -26 2 -6 25 -77 51 -158 l47 -148 43 0 c49 0 40 -16 85 162 l21 87 46
            15 c25 9 46 15 46 13 1 -1 19 -38 40 -82 29 -62 46 -85 77 -105 21 -13 39 -28
            39 -32 0 -4 20 -8 44 -8 42 0 45 2 56 36 11 32 10 38 -9 58 -26 27 -27 67 -3
            88 9 9 44 23 77 32 33 10 67 19 76 22 11 3 20 26 29 77 12 69 11 74 -14 131
            -14 32 -26 62 -26 66 0 4 19 10 43 13 24 3 50 9 59 12 13 5 20 -5 34 -49 10
            -31 22 -55 28 -53 6 2 17 37 26 77 l15 74 60 23 60 23 28 83 c15 45 27 86 27
            89 0 4 -15 10 -32 13 -18 4 -44 16 -58 27 l-25 20 62 59 63 58 87 3 87 3 8 33
            c9 33 9 33 56 26 26 -3 49 -8 51 -11 3 -2 -19 -28 -49 -58 l-53 -54 18 -61
            c30 -100 43 -95 81 36 14 49 27 90 29 92 2 2 30 7 64 12 52 7 171 52 171 65 0
            2 -5 16 -12 29 -9 22 -8 29 6 45 18 19 18 19 63 0 54 -23 79 -24 87 -3 11 28
            7 32 -56 62 -35 16 -81 44 -103 62 l-40 32 -113 -5 c-103 -4 -114 -3 -123 14
            -8 15 -21 19 -69 19 -56 0 -60 2 -75 29 -13 26 -22 30 -72 37 -58 7 -64 4 -92
            -45 -5 -8 -31 -16 -60 -19 -54 -5 -51 -7 -55 47 -1 8 -13 22 -26 33 -26 19
            -26 18 -83 -7 -32 -14 -60 -25 -62 -25 -3 0 -5 11 -5 24 0 21 -6 25 -50 31
            -38 5 -56 3 -75 -9 -13 -9 -39 -16 -57 -15 -31 1 -30 2 25 26 50 23 57 30 57
            55 0 24 -4 28 -29 28 -45 0 -61 10 -61 36 0 24 -10 28 -55 17z"
      />
      <path
        fill={fillColor}
        stroke="#C9A259"
        strokeWidth={5}
        d="M5007 2283 c-12 -3 -16 -11 -12 -24 4 -10 3 -50 -1 -89 -6 -67 -8
            -72 -45 -98 -35 -25 -38 -32 -44 -89 -7 -61 -7 -61 -66 -104 -32 -23 -59 -47
            -59 -53 0 -6 18 -21 40 -33 l40 -22 79 45 79 44 6 54 c6 41 14 60 37 82 l29
            28 0 133 0 133 -32 -1 c-18 -1 -41 -3 -51 -6z"
      />
    </a>
  );
}

export function Europe() {
  const [fillColor, setFillColor] = useState("#50711eee");
  const continentOcupied = useRef(false);
  const { data: session } = useSession();

  const fetchContinent = async () => {
    const getUsersInstances = await getContinents();
    if (getUsersInstances) {
      const continentInstance = getUsersInstances.find(
        (instance: any) => instance.country === "Europe"
      );
      if (continentInstance) {
        continentOcupied.current = true;
      }
    }
  };

  useEffect(() => {
    fetchContinent();
  }, []);

  const handleMouseEnter = () => {
    fetchContinent();
    if (continentOcupied.current === true) {
      setFillColor("#F56565"); //red color
    } else {
      setFillColor("#7e9f3b"); //liter green color
    }
  };

  function selectContinent() {
    fetchContinent();
    if (continentOcupied.current === false) {
      postUserInstance(
        (session?.user as any)?._id,
        (session?.user as any)?.fullname,
        1,
        "Europe",
        [],
        [],
        500,
        []
      );
    }
    setFillColor("#F56565"); //red color
    fetchContinent();
  }

  const handleMouseLeave = () => {
    setFillColor("#50711eee");
  };

  return (
    <a
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => selectContinent()}
    >
      <path
        fill={fillColor}
        stroke="#C9A259"
        strokeWidth={5}
        d="M3172 3167 c-12 -13 -22 -27 -22 -31 0 -19 58 -51 99 -57 39 -5 53
            -1 93 24 26 17 48 34 48 38 0 5 -19 18 -42 30 -32 16 -46 19 -59 11 -12 -8
            -28 -8 -51 -2 -43 13 -41 13 -66 -13z"
      />
      <path
        fill={fillColor}
        stroke="#C9A259"
        strokeWidth={5}
        d="M2901 3124 l-23 -27 28 -59 c19 -39 39 -65 61 -78 44 -26 51 -25 58
            3 6 23 9 23 62 15 33 -5 60 -5 65 0 12 12 -79 122 -101 122 -10 0 -23 11 -29
            25 -14 29 -27 32 -41 8 -10 -17 -12 -17 -25 0 -18 23 -28 22 -55 -9z"
      />
      <path
        fill={fillColor}
        stroke="#C9A259"
        strokeWidth={5}
        d="M3143 2858 c-103 -137 -233 -329 -233 -345 0 -20 77 -133 90 -133 5
            0 39 50 75 110 64 106 82 129 71 93 -2 -10 -6 -40 -8 -68 l-3 -50 63 3 c34 2
            62 1 62 -2 0 -3 -41 -39 -90 -81 l-91 -75 -85 0 c-84 0 -86 -1 -191 -57 l-106
            -57 36 -31 c20 -18 37 -35 37 -37 0 -3 -12 -9 -27 -12 -108 -26 -103 -23 -103
            -70 0 -51 10 -61 70 -69 43 -6 47 -4 119 55 l75 61 48 -52 47 -52 60 16 c32 8
            68 15 80 15 12 0 66 -22 121 -50 l99 -50 48 58 c26 31 59 71 73 88 23 29 33
            32 108 42 46 5 85 12 88 15 3 2 13 71 24 153 11 82 22 163 25 181 3 17 36 71
            76 122 88 114 86 121 -41 121 -69 0 -108 -6 -186 -31 -55 -17 -106 -33 -115
            -35 -11 -3 -55 39 -140 135 -68 77 -127 140 -130 140 -4 1 -24 -23 -46 -51z"
      />
      <path
        fill={fillColor}
        stroke="#C9A259"
        strokeWidth={5}
        d="M2397 2722 c-26 -26 -47 -51 -47 -55 0 -4 18 -7 40 -7 37 0 40 -2 40
            -29 0 -27 3 -29 51 -34 48 -6 55 -4 111 34 l60 41 -47 48 -48 48 -33 -16 c-31
            -14 -35 -14 -52 1 -10 9 -21 17 -23 17 -3 0 -26 -22 -52 -48z"
      />
      <path
        fill={fillColor}
        stroke="#C9A259"
        strokeWidth={5}
        d="M2547 2544 c-11 -11 4 -109 23 -144 15 -30 17 -43 9 -89 -6 -29 -8
            -55 -5 -58 7 -7 154 56 162 69 4 6 -10 26 -30 47 -35 35 -36 40 -36 109 l0 72
            -58 0 c-32 0 -61 -3 -65 -6z"
      />
      <path
        fill={fillColor}
        stroke="#C9A259"
        strokeWidth={5}
        d="M2456 2395 c-6 -29 -12 -37 -37 -42 -28 -5 -29 -7 -29 -64 0 -33 3
            -59 8 -59 16 1 121 28 131 35 6 3 11 28 11 54 0 40 -5 52 -33 79 -18 18 -36
            32 -39 32 -3 0 -9 -16 -12 -35z"
      />
    </a>
  );
}

export function Australia() {
  const [fillColor, setFillColor] = useState("#50711eee");
  const continentOcupied = useRef(false);
  const { data: session } = useSession();

  const fetchContinent = async () => {
    const getUsersInstances = await getContinents();
    if (getUsersInstances) {
      const continentInstance = getUsersInstances.find(
        (instance: any) => instance.country === "Australia"
      );
      if (continentInstance) {
        continentOcupied.current = true;
      }
    }
  };

  useEffect(() => {
    fetchContinent();
  }, []);

  const handleMouseEnter = () => {
    fetchContinent();
    if (continentOcupied.current === true) {
      setFillColor("#F56565"); //red color
    } else {
      setFillColor("#7e9f3b"); //liter green color
    }
  };

  function selectContinent() {
    fetchContinent();
    if (continentOcupied.current === false) {
      postUserInstance(
        (session?.user as any)?._id,
        (session?.user as any)?.fullname,
        1,
        "Australia",
        [],
        [],
        500,
        []
      );
    }
    setFillColor("#F56565"); //red color
    fetchContinent();
  }

  const handleMouseLeave = () => {
    setFillColor("#50711eee");
  };

  return (
    <a
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => selectContinent()}
    >
      <path
        fill={fillColor}
        stroke="#C9A259"
        strokeWidth={5}
        d="M4632 1467 c-33 -33 -44 -39 -54 -29 -7 7 -17 12 -23 12 -14 0 -36
            -91 -26 -105 5 -5 11 -21 14 -35 5 -20 18 -30 54 -43 64 -23 67 -22 86 16 9
            17 27 44 38 59 18 22 20 30 10 42 -9 11 -10 20 -1 36 9 17 7 26 -12 50 -13 16
            -28 31 -34 33 -6 3 -30 -13 -52 -36z"
      />
      <path
        fill={fillColor}
        stroke="#C9A259"
        strokeWidth={5}
        d="M4186 1391 c-3 -5 23 -37 58 -71 48 -46 67 -73 76 -106 9 -30 21 -49
            38 -58 23 -12 30 -11 64 12 43 28 42 23 26 73 -7 26 -17 39 -29 39 -11 0 -20
            11 -24 30 -4 19 -13 30 -24 30 -9 0 -30 14 -46 30 -25 26 -36 30 -81 30 -29 0
            -55 -4 -58 -9z"
      />
      <path
        fill={fillColor}
        stroke="#C9A259"
        strokeWidth={5}
        d="M4860 1345 c-32 -32 -33 -35 -20 -60 11 -21 12 -30 2 -45 -18 -29 25
            -53 100 -56 39 -2 66 -8 78 -19 16 -14 24 -15 54 -5 48 16 54 29 23 55 -14 13
            -27 36 -29 51 -3 25 -10 31 -57 46 -30 10 -67 29 -81 43 -14 14 -28 25 -31 24
            -2 -1 -20 -16 -39 -34z"
      />
      <path
        fill={fillColor}
        stroke="#C9A259"
        strokeWidth={5}
        d="M4788 1115 c-64 -13 -71 -17 -127 -77 -49 -53 -70 -67 -118 -82 -32
            -10 -61 -23 -64 -28 -3 -5 0 -28 8 -51 25 -72 34 -139 23 -176 -8 -28 -6 -36
            8 -47 51 -38 56 -38 133 -1 41 20 95 39 120 42 44 7 47 5 76 -29 32 -39 136
            -106 162 -105 9 0 32 6 51 13 31 12 35 18 52 82 10 38 23 96 29 130 10 60 10
            61 -22 110 -19 26 -48 87 -65 134 -30 79 -35 85 -66 92 -37 7 -48 3 -48 -18 0
            -20 -13 -17 -28 6 -14 23 -30 23 -124 5z"
      />
      <path
        fill={fillColor}
        stroke="#C9A259"
        strokeWidth={5}
        d="M5355 753 c16 -37 45 -127 45 -138 0 -7 -9 -15 -20 -18 -14 -4 -20
            -14 -20 -36 0 -24 -10 -39 -50 -73 -27 -24 -50 -46 -50 -49 0 -12 58 -69 69
            -69 21 0 90 72 101 105 6 18 19 35 30 38 18 5 60 62 60 82 0 6 -34 47 -76 93
            -73 79 -105 102 -89 65z"
      />
      <path
        fill={fillColor}
        stroke="#C9A259"
        strokeWidth={5}
        d="M5076 524 c-27 -19 -55 -32 -63 -29 -7 3 -20 8 -28 11 -8 3 -15 1
            -15 -4 0 -23 71 -163 81 -160 6 2 26 42 45 88 18 47 38 93 44 102 23 40 0 37
            -64 -8z"
      />
    </a>
  );
}

export function SouthAmerica() {
  const [fillColor, setFillColor] = useState("#50711eee");
  const continentOcupied = useRef(false);
  const { data: session } = useSession();

  const fetchContinent = async () => {
    const getUsersInstances = await getContinents();
    if (getUsersInstances) {
      const continentInstance = getUsersInstances.find(
        (instance: any) => instance.country === "South_America"
      );
      if (continentInstance) {
        continentOcupied.current = true;
      }
    }
  };

  useEffect(() => {
    fetchContinent();
  }, []);

  const handleMouseEnter = () => {
    fetchContinent();
    if (continentOcupied.current === true) {
      setFillColor("#F56565"); //red color
    } else {
      setFillColor("#7e9f3b"); //liter green color
    }
  };

  function selectContinent() {
    fetchContinent();
    if (continentOcupied.current === false) {
      postUserInstance(
        (session?.user as any)?._id,
        (session?.user as any)?.fullname,
        1,
        "South_America",
        [],
        [],
        500,
        []
      );
    }
    setFillColor("#F56565"); //red color
    fetchContinent();
  }

  const handleMouseLeave = () => {
    setFillColor("#50711eee");
  };

  return (
    <a
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => selectContinent()}
    >
      <path
        fill={fillColor}
        stroke="#C9A259"
        strokeWidth={5}
        d="M1709 1541 c-96 -47 -151 -101 -199 -198 -24 -48 -38 -88 -33 -92 6
            -3 51 -68 102 -144 l91 -137 -45 -203 c-26 -111 -49 -220 -51 -242 -3 -22 -9
            -55 -14 -73 -8 -31 -3 -42 68 -155 l78 -122 104 -6 c58 -3 108 -4 112 -2 4 2
            -24 55 -63 117 l-70 114 271 407 c148 224 270 409 270 410 0 2 -17 14 -37 26
            -21 13 -81 51 -133 84 -318 206 -380 245 -387 244 -5 0 -33 -13 -64 -28z"
      />
    </a>
  );
}
