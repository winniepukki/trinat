/**
* SIA Trinat restaurant project
* Copyright © winniepukki. All rights reserved.
*
* @license MIT
*/
import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import store from '@store/index';

import Header from '@component/Header/Header.component';
import Hero from '@component/Hero/Hero.component';
import Footer from '@component/Footer/Footer.component';
import Blockquote from '@component/Blockquote/Blockquote.component';
import Story from '@component/Story/Story.component';
import Contact from '@component/Contact/Contact.component';
import ProductList from '@component/ProductList/ProductList.component';
import EmbeddedMap from '@component/EmbeddedMap/EmbeddedMap.component';
import Special from '@component/Special/Special.component';

class App extends React.Component {
    static propTypes = {
        t: PropTypes.func.isRequired,
        i18n: PropTypes.instanceOf(Object).isRequired
    }

    constructor(props) {
        super(props);

        this.handleCallback = this.handleCallback.bind(this);
        this.changeLanguage = this.changeLanguage.bind(this);
    }

    handleCallback(callbackData) {
        if (callbackData === undefined) {
            return;
        }
        this.changeLanguage(callbackData);
    }

    getCurrentLanguage() {
        const {
            i18n: {
                language = ''
            } = {}
        } = this.props;

        return language;
    }

    changeLanguage(language) {
        const {
            i18n = {}
        } = this.props;

        i18n.changeLanguage(language);
    }

    render() {
        const { t } = this.props;
        const currentLanguage = this.getCurrentLanguage().toUpperCase();

        return (
          <Router>
            <Switch>
              <Route exact path="/">
                <Provider store={ store }>
                  <Header parentCallback={ this.handleCallback } />
                  <Hero
                    welcomeMessage={ t('welcome') }
                    titleCaptionFront={ t('trinat.title') }
                    titleCaptionBold={ t('trinat.type') }
                    subtitle={ t('hero.title') }
                    languageCode={ this.getCurrentLanguage() }
                  />
                  <Blockquote
                    content={ t('blockquote.blockquote-content') }
                    author={ t('blockquote.author') }
                    description={ t('blockquote.description') }
                  />
                  <Story
                    title={ t('story.title') }
                    description={ t('story.description') }
                    storyText={ t('story.text') }
                  />
                  <ProductList
                    languageCode={ this.getCurrentLanguage() }
                  />
                  <Special
                    languageCode={ this.getCurrentLanguage() }
                  />
                  <Contact />
                  <EmbeddedMap />
                  <Footer
                    lang={ currentLanguage }
                  />
                </Provider>
              </Route>
            </Switch>
          </Router>
        );
    }
}

export default withTranslation()(App);
