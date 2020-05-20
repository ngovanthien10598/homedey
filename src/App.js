import React, { useState, useEffect } from 'react';
import GGMap from './components/GGMap/GGMap';

function App() {
  const [position, setPosition] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [marker, setMarker] = useState(null);
  const positionList = [
    {
      "id": 18058,
      "name": "Anthoi Riverside",
      "latitude": "10.071967124939",
      "longitude": "105.75787353516",
      "district": {
        "id": 163,
        "name": "Bình Thủy",
        "prefix": "Quận",
        "city": {
          "id": 12,
          "name": "Cần Thơ",
          "prefix": "Thành phố"
        }
      }
    },
    {
      "id": 18059,
      "name": "Hưng Phú",
      "latitude": "10.01212978363",
      "longitude": "105.78941345215",
      "district": {
        "id": 164,
        "name": "Cái Răng",
        "prefix": "Quận",
        "city": {
          "id": 12,
          "name": "Cần Thơ",
          "prefix": "Thành phố"
        }
      }
    },
    {
      "id": 18060,
      "name": "Milano Plaza",
      "latitude": "10.01118850708",
      "longitude": "105.79025268555",
      "district": {
        "id": 164,
        "name": "Cái Răng",
        "prefix": "Quận",
        "city": {
          "id": 12,
          "name": "Cần Thơ",
          "prefix": "Thành phố"
        }
      }
    },
    {
      "id": 18061,
      "name": "Nam Long - Hưng Thạnh",
      "latitude": "10.010577201843",
      "longitude": "105.78753662109",
      "district": {
        "id": 164,
        "name": "Cái Răng",
        "prefix": "Quận",
        "city": {
          "id": 12,
          "name": "Cần Thơ",
          "prefix": "Thành phố"
        }
      }
    },
    {
      "id": 18062,
      "name": "Tây Nguyên Plaza",
      "latitude": "10.004126548767",
      "longitude": "105.7977142334",
      "district": {
        "id": 164,
        "name": "Cái Răng",
        "prefix": "Quận",
        "city": {
          "id": 12,
          "name": "Cần Thơ",
          "prefix": "Thành phố"
        }
      }
    },
    {
      "id": 18063,
      "name": "KDC Hồng Phát A",
      "latitude": "10.022591590881",
      "longitude": "105.74512481689",
      "district": {
        "id": 166,
        "name": "Ninh Kiều",
        "prefix": "Quận",
        "city": {
          "id": 12,
          "name": "Cần Thơ",
          "prefix": "Thành phố"
        }
      }
    },
    {
      "id": 18064,
      "name": "KDC Hồng Phát B",
      "latitude": "10.02419757843",
      "longitude": "105.74942016602",
      "district": {
        "id": 166,
        "name": "Ninh Kiều",
        "prefix": "Quận",
        "city": {
          "id": 12,
          "name": "Cần Thơ",
          "prefix": "Thành phố"
        }
      }
    },
    {
      "id": 18065,
      "name": "TD Plaza Cần Thơ",
      "latitude": "10.049569129944",
      "longitude": "105.78687286377",
      "district": {
        "id": 166,
        "name": "Ninh Kiều",
        "prefix": "Quận",
        "city": {
          "id": 12,
          "name": "Cần Thơ",
          "prefix": "Thành phố"
        }
      }
    },
    {
      "id": 18066,
      "name": "Vincom Cần Thơ",
      "latitude": "10.026397705078",
      "longitude": "105.77597045898",
      "district": {
        "id": 166,
        "name": "Ninh Kiều",
        "prefix": "Quận",
        "city": {
          "id": 12,
          "name": "Cần Thơ",
          "prefix": "Thành phố"
        }
      }
    }
  ]

  useEffect(() => {
    const getPosition = async () => {
      await navigator.geolocation.getCurrentPosition(currentPosition => {
        setPosition(currentPosition);
      });
    }
    getPosition();
  }, []);

  const handleMarkerClick = (props, marker, e) => {
    setMarker(marker);
    console.log(props);
  }

  return (
    <div className="App">
      {
        position &&
        <GGMap onMarkerClick={handleMarkerClick} selectedMarker={marker} center={{
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }} positionList={positionList} />
      }
    </div>
  );
}

export default App;
