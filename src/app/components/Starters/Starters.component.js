/**
* SIA Trinat restaurant project
* Copyright © winniepukki. All rights reserved.
*
* @license MIT
*/
import React from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import firebase from '@util/firebase';

import './starters.style.scss';
import Starter from '../Starter/Starter';

class Starters extends React.Component {
    static propTypes = {
        t: PropTypes.func.isRequired,
        languageCode: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            data: {},
            loading: false
        };

        this.getStartersFirebaseData = this.getStartersFirebaseData.bind(this);
    }

    componentDidMount() {
        this.getStartersFirebaseData();
    }

    componentDidUpdate() {
        this.getStartersFirebaseData();
    }

    getStartersFirebaseData() {
        const { languageCode } = this.props;
        let startersLang;

        switch (languageCode) {
        case 'lv':
            startersLang = 'Starters-LV';
            break;
        case 'ru':
            startersLang = 'Starters-RU';
            break;
        default:
            startersLang = 'Starters-LV';
            break;
        }

        const startersRef = firebase.database().ref(startersLang);
        startersRef.once('value').then((dataSnapshot) => {
            this.response = dataSnapshot.val();
            this.setState({
                data: this.response,
                loading: true
            });
        });
    }

    renderStartersFirebaseData() {
        const { loading, data } = this.state;
        const { t } = this.props;
        const startersList = [];

        if (!Object.keys(data).length) {
            return t('loading');
        }

        Object.values(data).filter((item) => {
            if (item === null) {
                return null;
            }

            startersList.push(item);

            return startersList;
        });

        return loading ? (
            startersList.map((starter) => {
                if (starter === null) {
                    return null;
                }

                const { title } = starter;

                if (!title.length) {
                    return null;
                }

                return (<Starter starter={ starter } key={ title } />);
            })
        ) : t('loading');
    }

    render() {
        const { t } = this.props;

        return (
            <div>
                <section className="starters-menu" style={ { marginBottom: '60px' } }>
                <div className="section-title">
                    <h3>
                    <div className="parallax-headline">Amazing</div>
                    <div className="parallax-title">{ t('delicious') }</div>
                    </h3>
                </div>
                </section>
                <div className="container">
                <div className="parallax-section parallax-section-starters">
                    <div className="inner-container inner-container-starters">
                    <h3>
                        <p className="parallax-title">{ t('starters') }</p>
                    </h3>
                    <p className="simple-text">{ t('starters-info') }</p>
                    { this.renderStartersFirebaseData() }
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

export default withTranslation()(Starters);
