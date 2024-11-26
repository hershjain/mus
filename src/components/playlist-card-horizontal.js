import React from "react";
import '../styles/playlist-card-horizontal.css';

const PlaylistCardHorizontal = ({ title, imageUrl, curator, key}) => {

    document.addEventListener('DOMContentLoaded', () => {
        const confirmButton = document.getElementById('confirm-button');
        const toggles = document.querySelectorAll('.circle-toggle input');
      
        toggles.forEach(toggle => {
          toggle.addEventListener('change', function () {
            const slider = this.nextElementSibling;
            const publicStatus = slider.querySelector('.public');
            const privateStatus = slider.querySelector('.private');
      
            // Toggle visibility of statuses
            publicStatus.style.opacity = this.checked ? '1' : '0';
            privateStatus.style.opacity = this.checked ? '0' : '1';
          });
        });
      
        confirmButton.addEventListener('click', () => {
          const publicIDs = Array.from(document.querySelectorAll('.list-item'))
            .filter(item => {
              const toggle = item.querySelector('.circle-toggle input');
              return toggle.checked; // Get only checked toggles
            })
            .map(item => item.getAttribute('data-id')); // Collect their IDs
      
          console.log('Public IDs:', publicIDs);
          // You can send `publicIDs` to the backend or use them as needed
        });
      });
      


    return (
        <div className = "playlist-card-horizontal">
            <div className="playlist-img-title">
                <img src={imageUrl} alt={title} className="playlist-image-small" />
                <div className="playlist-info">
                    <h3 className="playlist-title-h">{title}</h3>
                    <p className="playlist-curator-h">{curator}</p>
                </div>
            </div>
            <div className="import-functions" data-id={key}>
                <label class="circle-toggle">
                    <input type="checkbox" />
                    <span class="slider">
                        <span class="status public"></span>
                        <span class="status private"></span>
                    </span>
                </label>
            </div>
        </div>
    );
};

export default PlaylistCardHorizontal;