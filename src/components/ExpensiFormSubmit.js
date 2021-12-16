import _ from 'underscore';
import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../styles/styles';
import Icon from './Icon';
import * as Expensicons from './Icon/Expensicons';
import colors from '../styles/colors';
import ExpensifyButton from './ExpensifyButton';
import withLocalize, {withLocalizePropTypes} from './withLocalize';
import TextLink from './TextLink';
import ExpensifyText from './ExpensifyText';
import RenderHTML from './RenderHTML';

const propTypes = {
    // /** Whether the button is disabled */
    // isDisabled: PropTypes.bool,

    // /** Submit function */
    // onSubmit: PropTypes.func.isRequired,

    // /** Text for the button */
    // buttonText: PropTypes.string.isRequired,

    // /** Callback fired when the "fix the errors" link is pressed */
    // onFixTheErrorsLinkPressed: PropTypes.func.isRequired,

    // /** Error message to display above button */
    // message: PropTypes.string,

    // /** Whether message is in html format */
    // isMessageHtml: PropTypes.bool,

    // /** Styles for container element */
    // containerStyles: PropTypes.arrayOf(PropTypes.object),

    // /** Is the button in a loading state */
    // isLoading: PropTypes.bool,

    // ...withLocalizePropTypes,
};

const defaultProps = {
    message: '',
    isDisabled: false,
    isMessageHtml: false,
    containerStyles: [],
    isLoading: false,
};

const FormAlertWithSubmitButton = (props) => {
    /**
     * @returns {React.Component}
     */
    function getAlertPrompt() {
        let error = '';

        // TODO: Check html messages from server errors
        if (!_.isEmpty(props.serverError.message)) {
            if (props.isMessageHtml) {
                error = (
                    <RenderHTML html={`<muted-text>${props.message}</muted-text>`} />
                );
            } else {
                error = (
                    <ExpensifyText style={styles.mutedTextLabel}>{props.message}</ExpensifyText>
                );
            }
        } else {
            error = (
                <>
                    <ExpensifyText style={styles.mutedTextLabel}>
                        {`${props.translate('common.please')} `}
                    </ExpensifyText>
                    <TextLink
                        style={styles.label}
                        onPress={() => props.serverError.firstErrorToFix.focus()}
                    >
                        {props.translate('common.fixTheErrors')}
                    </TextLink>
                    <ExpensifyText style={styles.mutedTextLabel}>
                        {` ${props.translate('common.inTheFormBeforeContinuing')}.`}
                    </ExpensifyText>
                </>
            );
        }

        return (
            <View style={[styles.flexRow, styles.ml2, styles.flexWrap, styles.flex1]}>
                {error}
            </View>
        );
    }

    return (
        <View style={[styles.mb5, styles.flex1, styles.justifyContentEnd, ...props.containerStyles]}>
            {!_.isEmpty(props.serverError) && (
                <View style={[styles.flexRow, styles.alignItemsCenter, styles.mb3]}>
                    <Icon src={Expensicons.Exclamation} fill={colors.red} />
                    {getAlertPrompt()}
                </View>
            )}
            <ExpensifyButton
                success
                pressOnEnter
                text={props.buttonText}
                onPress={props.onSubmit}
                isDisabled={props.isLoading}
                isLoading={props.isLoading}
            />
        </View>
    );
};

FormAlertWithSubmitButton.EXPENSIFORM = true;
FormAlertWithSubmitButton.propTypes = propTypes;
FormAlertWithSubmitButton.defaultProps = defaultProps;
FormAlertWithSubmitButton.displayName = 'FormAlertWithSubmitButton';

export default withLocalize(FormAlertWithSubmitButton);
