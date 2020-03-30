import React, { Component } from "react";
import {
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  View
} from "react-native";
import { connect } from "react-redux";
//styling
import styles, { colors } from "../styles/Styles";
import Text from "../components/Text";
import Button from "../components/Button";

import Notification from "../components/Notification";
import EventCard from "../components/EventCard";

import { populateEvents } from "../actions/Login";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { sliderWidth, itemWidth } from '../styles/SliderEntry.style';
import { ENTRIES1, ENTRIES2 } from '../static/entries';
import SliderEntry from '../components/SliderEntry';
import { fetchBackend } from "../utils";
const SLIDER_1_FIRST_ITEM = 1;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM
    };
  }
  _renderItem({ item, index }) {
    return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
  }

  _renderItemWithParallax({ item, index }, parallaxProps) {
    return (
      <SliderEntry
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={true}
        parallaxProps={parallaxProps}
      />
    );
  }

  _renderLightItem({ item, index }) {
    return <SliderEntry data={item} even={false} />;
  }

  _renderDarkItem({ item, index }) {
    return <SliderEntry data={item} even={true} />;
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.fetchEvents().then(() => {
      this.setState({ refreshing: false });
    });
  };

  async fetchEvents() {
    console.log("home screen fetching events");
    fetchBackend("/events/get", "GET")
      .then(response => response.json())
      .then(response => {
        console.log("response AAB========>");
        console.log(JSON.stringify(response));
        this.props.populateEvents(response);
      });
  }

  componentDidMount() {
    this.props.events ? null : this.fetchEvents();
  }

  render() {
    const { slider1ActiveSlide } = this.state;

    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
        {!this.props.isVerified && (
          <Notification
            onPress={() => this.props.navigation.navigate("Confirm")}
            colour="#ff7043"
          >
            Please confirm your account
          </Notification>
        )}
        <View style={styles.widgetContainer}>
          <Text style={styles.h1}>Home</Text>
          {this.props.isLoggedIn && (
            <Text>Welcome, {this.props.userData.fname} </Text>
          )}
          {!this.props.isLoggedIn && <Text>Welcome to BizTech </Text>}
          <Button
            title="Event Check-in"
            onPress={() => this.props.navigation.navigate("Checkin")}
          />
          <Carousel
            ref={c => (this._slider1Ref = c)}
            data={ENTRIES1}
            renderItem={this._renderItemWithParallax}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            hasParallaxImages={true}
            firstItem={SLIDER_1_FIRST_ITEM}
            inactiveSlideScale={0.94}
            inactiveSlideOpacity={0.7}
            // inactiveSlideShift={20}
            containerCustomStyle={styles.slider}
            contentContainerCustomStyle={styles.sliderContentContainer}
            loop={true}
            loopClonesPerSide={2}
            autoplay={true}
            autoplayDelay={500}
            autoplayInterval={3000}
            onSnapToItem={index => this.setState({ slider1ActiveSlide: index })}
          />
          <Pagination
            dotsLength={ENTRIES1.length}
            activeDotIndex={slider1ActiveSlide}
            containerStyle={styles.paginationContainer}
            dotColor={"rgba(255, 255, 255, 0.92)"}
            dotStyle={styles.paginationDot}
            inactiveDotColor={colors.black}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            carouselRef={this._slider1Ref}
            tappableDots={!!this._slider1Ref}
          />
        </View>

        {/* <View style={styles.center}>
          {this.props && this.props.events &&
            this.props.events.map(event => {
              return (
                <EventCard key={event.id} event={event}
                  onPress={() => {
                    this.props.navigation.navigate('Event', {
                      event: event
                    })
                  }
                  } />
              )
            })
          }
        </View> */}
      </ScrollView>
    );
  }
}

// objects
const mapStateToProps = state => {
  return {
    userData: state.login.user,
    isLoggedIn: state.login.isLoggedIn,
    isVerified: state.login.isVerified,
    events: state.login.events
  };
};
// actions
const mapDispatchToProps = dispatch => {
  return {
    populateEvents: events => dispatch(populateEvents(events))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
