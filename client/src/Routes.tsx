import React from "react";
import { Route, Switch } from "react-router-dom";
import { HomePage } from "./pages/Home/HomePage";
import { VacanciesPage } from "./pages/Vacancies/VacanciesPage";
import { ExclusiveOffersPage } from "./pages/ExclusiveOffers/ExclusiveOffersPage";
import { EventsPage } from "./pages/Events/EventsPage";
import { RestaurantMirPage } from "./pages/RestaurantMir/RestaurantMirPage";
import { WeddingBanquetsPage } from "./pages/WeddingBanquets/WeddingBanquetsPage";
import { BarsAndRestaurantsPage } from "./pages/BarsAndRestaurants/BarsAndRestaurantsPage";
import { ConferenceHallsPage } from "./pages/ConferenceHalls/ConferenceHallsPage";
import { ReviewsPage } from "./pages/Reviews/ReviewsPage";
import { AboutPage } from "./pages/About/AboutPage";
import { RoomsPage } from "./pages/Rooms/RoomsPage";
import { BookingPage } from "./pages/Booking/BookingPage";
import { RoomPage } from "./pages/Room/RoomPage";

export const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <HomePage />
      </Route>
      <Route path="/booking" exact>
        <BookingPage />
      </Route>
      <Route path="/rooms" exact>
        <RoomsPage />
      </Route>
      <Route path="/rooms/:id" exact>
        <RoomPage />
      </Route>
      <Route path="/about" exact>
        <AboutPage />
      </Route>
      <Route path="/reviews" exact>
        <ReviewsPage />
      </Route>
      <Route path="/conferenceHalls" exact>
        <ConferenceHallsPage />
      </Route>
      <Route path="/barsAndRestaurants" exact>
        <BarsAndRestaurantsPage />
      </Route>
      <Route path="/weddingBanquets" exact>
        <WeddingBanquetsPage />
      </Route>
      <Route path="/restaurantMir" exact>
        <RestaurantMirPage />
      </Route>
      <Route path="/events" exact>
        <EventsPage />
      </Route>
      <Route path="/exclusiveOffers" exact>
        <ExclusiveOffersPage />
      </Route>
      <Route path="/vacancies" exact>
        <VacanciesPage />
      </Route>
    </Switch>
  );
};
