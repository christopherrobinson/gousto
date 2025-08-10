export const renderRecipeCard = ({ cuisine, id, image, prep_time_minutes, rating, title }) => {
  const imageSrc = createImageUrl(image, { h: 288, w: 288 });

  return `
    <a class="bg-white  border  border-secondary-100  flex  flex-col  group  h-full  overflow-hidden  rounded-lg  transition  hover:border-secondary-200  hover:shadow-sm" href="/recipes/${id}/">
      <div class="aspect-square  bg-secondary-100  relative">
        <div class="overflow-hidden">
          <picture>
            <source
              srcset="
                ${imageSrc}&fit=cover&h=288&output=webp&w=288,
                ${imageSrc}&fit=cover&h=576&output=webp&w=576 2x
              "
              type="image/webp"
            />
            <img
              alt="${title}"
              class="transition  w-full  group-hover:scale-110"
              decoding="async"
              height="288"
              loading="lazy"
              src="${imageSrc}&fit=cover&h=288&w=288"
              srcset="${imageSrc}&fit=cover&h=576&w=576 2x"
              width="288"
            />
          </picture>
        </div>
        ${isValidRating(rating) ? (`
          <div class="absolute  bg-white/90  end-2  flex  items-center  px-2  py-1.5  rounded-lg  space-x-2  text-sm  top-2">
            <svg width="1.13em" height="1em" class="text-primary-600" data-icon="star">
              <symbol id="ai:local:star" viewBox="0 0 576 512">
                <path fill="currentColor" d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4 459.8 484c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6 68.6-141.3C270.4 5.2 278.7 0 287.9 0m0 79-52.5 108.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9l85.9 85.1c5.5 5.5 8.1 13.3 6.8 21l-20.3 119.7 105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2-20.2-119.6c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1-118.3-17.5c-7.8-1.2-14.6-6.1-18.1-13.3z" />
              </symbol>
              <use href="#ai:local:star" />
            </svg>
            <span>${rating.average.toFixed(1)}</span>
          </div>
        `) : ``}
      </div>
      <div class="flex  flex-col  h-full  justify-between  p-4">
        <h2 class="font-medium  font-serif  mb-4  text-md  transition  group-hover:text-primary-600">${title}</h2>
        <div class="flex  items-center  justify-between  overflow-hidden  space-x-8  text-sm  text-center  group-hover:text-zinc-950">
          <div class="flex  items-center  space-x-2">
            <svg width="0.88em" height="1em" class="text-primary-600" data-icon="stopwatch">
              <symbol id="ai:local:stopwatch" viewBox="0 0 448 512">
                <path fill="currentColor" d="M144 24c0-13.3 10.7-24 24-24h112c13.3 0 24 10.7 24 24s-10.7 24-24 24h-32v49.4c43.4 5 82.8 23.3 113.8 50.9L391 119c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-31 31c24 33.9 38.1 75.3 38.1 120 0 114.9-93.1 208-208 208S16 418.9 16 304c0-106.8 80.4-194.7 184-206.6V48h-32c-13.3 0-24-10.7-24-24m80 440a160 160 0 1 0 0-320 160 160 0 1 0 0 320m24-248v104c0 13.3-10.7 24-24 24s-24-10.7-24-24V216c0-13.3 10.7-24 24-24s24 10.7 24 24" />
              </symbol>
              <use href="#ai:local:stopwatch" />
            </svg>
            <span>${prep_time_minutes['2']} mins</span>
          </div>
          <div class="flex  items-center  space-x-2">
            <svg width="1em" height="1em" class="text-primary-600" data-icon="globe">
              <symbol id="ai:local:globe" viewBox="0 0 512 512">
                <path fill="currentColor" d="M256 464c7.4 0 27-7.2 47.6-48.4 8.8-17.7 16.4-39.2 22-63.6H186.4c5.6 24.4 13.2 45.9 22 63.6C229 456.8 248.6 464 256 464m-77.5-160h155c1.6-15.3 2.5-31.4 2.5-48s-.9-32.7-2.5-48h-155c-1.6 15.3-2.5 31.4-2.5 48s.9 32.7 2.5 48m7.9-144h139.2c-5.6-24.4-13.2-45.9-22-63.6C283 55.2 263.4 48 256 48s-27 7.2-47.6 48.4c-8.8 17.7-16.4 39.2-22 63.6m195.3 48c1.5 15.5 2.2 31.6 2.2 48s-.8 32.5-2.2 48h76.7c3.6-15.4 5.6-31.5 5.6-48s-1.9-32.6-5.6-48zm58.8-48c-21.4-41.1-56.1-74.1-98.4-93.4 14.1 25.6 25.3 57.5 32.6 93.4h65.9zm-303.3 0c7.3-35.9 18.5-67.7 32.6-93.4-42.3 19.3-77 52.3-98.4 93.4h65.9zm-83.6 48C50 223.4 48 239.5 48 256s1.9 32.6 5.6 48h76.7c-1.5-15.5-2.2-31.6-2.2-48s.8-32.5 2.2-48zm288.5 237.4c42.3-19.3 77-52.3 98.4-93.4h-65.9c-7.3 35.9-18.5 67.7-32.6 93.4zm-172.2 0c-14.1-25.6-25.3-57.5-32.6-93.4H71.4c21.4 41.1 56.1 74.1 98.4 93.4zM256 512a256 256 0 1 1 0-512 256 256 0 1 1 0 512" />
              </symbol>
              <use href="#ai:local:globe" />
            </svg>
            <span>${cuisine}</span>
          </div>
        </div>
      </div>
    </a>
  `;
}
