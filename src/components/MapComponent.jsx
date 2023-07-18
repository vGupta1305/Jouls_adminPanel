import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useMediaQuery,useTheme } from "@mui/material";
import { tokens } from '../theme';


const MapComponent = () => {
  const mapRef = useRef(null);  
  const [productCounts, setProductCounts] = useState({});

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const latitude = 20; // Approximate latitude of India
  const longitude = 77; // Approximate longitude of India

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"))
  
  const zoomLevel =5// Adjust the value as per your preference

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://backend-production-e1c2.up.railway.app/api/auth/admin/users'); // Replace with your actual API endpoint
        const products = response.data;

        // Calculate product counts
        const counts = {};
        products.forEach((product) => {
          // console.log(product)
          const { state } = product;
          counts[state] = (counts[state] || 0) + 1;
        });

        setProductCounts(counts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (mapRef.current && Object.keys(productCounts).length > 0) {
      const getStatesData = async () => {
        try {
          const response = await axios.get('/india_state_geo.json'); // Update the path as per your file location
          const statesData = response.data;

          L.geoJSON(statesData, {
            style: (feature) => {
              // console.log(feature)
              const state = feature.properties.NAME_1;
              const productCount = productCounts[state] || 0;

              const getColor = (count) => {
                return count > 100 ? 'green' : count > 50 ? 'yellow' : 'red';
              };

              return {
                fillColor: getColor(productCount),
                weight: 1,
                opacity: 1,
                color: 'white',
                fillOpacity: 0.7
              };
            },
            onEachFeature: (feature, layer) => {
              const state = feature.properties.NAME_1;
              const productCount = productCounts[state] || 0;

              layer.on({
                mouseover: () => {
                  layer.bindTooltip(`State: ${state}<br>Product Count: ${productCount}`).openTooltip();
                },
                mouseout: () => {
                  layer.unbindTooltip();
                }
              });
            }
          }).addTo(mapRef.current);

          mapRef.current.fitBounds(L.geoJSON(statesData).getBounds());
        } catch (error) {
          console.error('Error loading state boundaries:', error);
        }
      };

      getStatesData();
    }
  }, [productCounts]);

  useEffect(() => {
    if (!mapRef.current) {
      const mapInstance = L.map('map', {
        scrollWheelZoom: false,
        zoomControl: false
      }).setView([latitude, longitude], zoomLevel);

      L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png', {
        attribution: 'Map data &copy; OpenStreetMap contributors'
      }).addTo(mapInstance);

      mapRef.current = mapInstance;
    }
  }, [latitude, longitude, zoomLevel,L.tileLayer]);

  return (
    <div id="map" style={{ height: '400px' }}>
      {Object.keys(productCounts).length === 0 && <div>Loading...</div>}
    </div>
  );
};

export default MapComponent;
