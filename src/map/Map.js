/* eslint-disable no-underscore-dangle */
import { useContext, useEffect, useRef, useState } from 'react';
import { Map, View } from 'ol';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import Select from 'ol/interaction/Select';
import { click } from 'ol/events/condition';
import { Circle, Fill, Stroke, Style } from 'ol/style';

import './Map.css';
import { AppContext } from '../contexts/App';

const styles = [
  new Style({
    stroke: new Stroke({
      color: '#0091ea',
      width: 3,
    }),
  }),
  new Style({
    stroke: new Stroke({
      color: '#4caf50',
      width: 3,
    }),
  }),
  new Style({
    stroke: new Stroke({
      color: '#ffeb3b',
      width: 3,
    }),
  }),
  new Style({
    stroke: new Stroke({
      color: '#ff5722',
      width: 3,
    }),
  }),
  new Style({
    stroke: new Stroke({
      color: '#795548',
      width: 3,
    }),
  }),
];

const MapWrapper = () => {
  const {
    roads,
    busStops,
    shortestRoute,
    subRoutes,
    subRoutesLayers,
    setSubRoutesLayers,
    updateBusStops,
  } = useContext(AppContext);

  const [map, setMap] = useState();

  const [roadsLayer] = useState(
    new VectorLayer({
      source: new VectorSource(),
      style: new Style({
        stroke: new Stroke({
          color: '#616161',
          width: 5,
        }),
      }),
    })
  );

  const [busStopsLayer] = useState(
    new VectorLayer({
      source: new VectorSource(),
      style: new Style({
        image: new Circle({
          radius: 4,
          fill: new Fill({
            color: '#b71c1c',
          }),
          stroke: new Stroke({
            color: '#ffffff',
            width: 1,
          }),
        }),
      }),
    })
  );

  const [shortestRouteLayer] = useState(
    new VectorLayer({
      source: new VectorSource(),
      style: new Style({
        stroke: new Stroke({
          color: '#673ab7',
          width: 10,
        }),
      }),
    })
  );

  /* type Options = {
    addCondition?: import("../events/condition.js").Condition;
    condition?: import("../events/condition.js").Condition;
    layers?: Array<Layer<any>> | ((arg0: import("../layer/Layer.js").default<import("../source/Source").default>) => boolean);
    style?: import("../style/Style.js").StyleLike | null;
    removeCondition?: import("../events/condition.js").Condition;
    toggleCondition?: import("../events/condition.js").Condition;
    multi?: boolean;
    features?: import("../Collection.js").default<Feature<any>>;
    filter?: FilterFunction;
    hitTolerance?: number;
} */
  const [selected] = useState(
    new Select({
      condition: click,
      layers: [busStopsLayer],
      hitTolerance: 10,
    })
  );
  const mapRef = useRef();

  useEffect(() => {
    selected.on('select', () => {
      if (selected.getFeatures().getLength() > 2) {
        selected.getFeatures().removeAt(0);
      }
      const stops = [];
      selected
        .getFeatures()
        .getArray()
        .forEach((element) => {
          const properties = element.getProperties();
          stops.push({
            id: element.getId(),
            description: properties.description,
          });
        });
      updateBusStops(stops);
    });

    const options = {
      view: new View({
        projection: 'EPSG:4326',
        center: [-84.43, 10.31],
        zoom: 11,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        roadsLayer,
        shortestRouteLayer,
        busStopsLayer,
      ],
      controls: [],
      overlays: [],
    };
    const mapObject = new Map(options);
    mapObject.addInteraction(selected);
    mapObject.setTarget(mapRef.current);
    // mapObject.addLayer;
    setMap(mapObject);

    return () => mapObject.setTarget(undefined);
  }, []);

  useEffect(() => {
    if (roads.features.length) {
      roadsLayer.setSource(
        new VectorSource({
          features: new GeoJSON().readFeatures(roads),
        })
      );
    }
  }, [roads]);

  useEffect(() => {
    if (busStops.features.length) {
      busStopsLayer.setSource(
        new VectorSource({
          features: new GeoJSON().readFeatures(busStops),
        })
      );
    }
  }, [busStops]);

  useEffect(() => {
    if (shortestRoute.features.length) {
      shortestRouteLayer.setSource(
        new VectorSource({
          features: new GeoJSON().readFeatures(shortestRoute),
        })
      );
    }
  }, [shortestRoute]);

  useEffect(() => {
    subRoutesLayers.forEach((layer) => {
      map.removeLayer(layer);
    });
    setSubRoutesLayers([]);
    subRoutes.forEach((busRoute, index) => {
      const newLayer = new VectorLayer({
        source: new VectorSource({
          features: new GeoJSON().readFeatures(busRoute.feature_collection),
        }),
        style: styles[index],
      });
      setSubRoutesLayers(subRoutesLayers.concat(newLayer));
      map.addLayer(newLayer);
    });
  }, [subRoutes]);

  return <div ref={mapRef} className="map-container" />;
};

export default MapWrapper;
