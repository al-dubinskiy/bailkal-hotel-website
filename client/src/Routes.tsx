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
import { ContactsPage } from "./pages/Contacts/ContactsPage";
import { AdminRoomsListPage } from "./admin_panel/pages/AdminRoomsListPage/AdminRoomsListPage";
import { AdminBookingsStatusesPage } from "./admin_panel/pages/AdminBookingsStatusesPage/AdminBookingsStatusesPage";
import { AdminAvailableBookingsDatesPage } from "./admin_panel/pages/AdminAvailableBookingsDatesPage/AdminAvailableBookingsDatesPage";
import { AdminReceivedReviewsAndOverallRatingPage } from "./admin_panel/pages/AdminReceivedReviewsAndOverallRatingPage/AdminReceivedReviewsAndOverallRatingPage";
import { AdminEmailSubscribersPage } from "./admin_panel/pages/AdminEmailSubscribersPage/components/AdminEmailSubscribersPage";
import { AdminNewsLetterByEmailPage } from "./admin_panel/pages/AdminNewsLetterByEmailPage/AdminNewsLetterByEmailPage";

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
      <Route path="/contacts" exact>
        <ContactsPage />
      </Route>
      <Route path="/conference-halls" exact>
        <ConferenceHallsPage />
      </Route>
      <Route path="/bars-and-restaurants" exact>
        <BarsAndRestaurantsPage />
      </Route>
      <Route path="/wedding-banquets" exact>
        <WeddingBanquetsPage />
      </Route>
      <Route path="/restaurant-mir" exact>
        <RestaurantMirPage />
      </Route>
      <Route path="/events" exact>
        <EventsPage />
      </Route>
      <Route path="/exclusive-offers" exact>
        <ExclusiveOffersPage />
      </Route>
      <Route path="/vacancies" exact>
        <VacanciesPage />
      </Route>
      {/* Admin pannel */}
      <Route path="/admin/rooms-list" exact>
        <AdminRoomsListPage />
      </Route>
      <Route path="/admin/bookings-statuses" exact>
        <AdminBookingsStatusesPage />
      </Route>
      <Route path="/admin/available-bookings-dates" exact>
        <AdminAvailableBookingsDatesPage />
      </Route>
      <Route path="/admin/received-reviews-and-overall-rating" exact>
        <AdminReceivedReviewsAndOverallRatingPage />
      </Route>
      <Route path="/admin/email-subscribers" exact>
        <AdminEmailSubscribersPage />
      </Route>
      <Route path="/admin/newsletter-by-email" exact>
        <AdminNewsLetterByEmailPage />
      </Route>
    </Switch>
  );
};
