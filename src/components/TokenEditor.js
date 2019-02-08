import React from 'react';
import {
    withStyles,
    Card,
    CardContent,
    CardActions,
    Modal,
    Button,
    TextField,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import { compose } from 'recompose';

const styles = theme => ({
    modal: {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
    },
    modalCard: {
	width: '90%',
	maxWidth: 500,
    },
    modalCardContent: {
	display: 'flex',
	flexDirection: 'column',
    },
    marginTop: {
	marginTop: 2 * theme.spacing.unit,
    },
});

const TokenEditor = ({ classes, token, onSave, history }) => (
    <Form initialValues={token} onSubmit={onSave}>
	{({ handleSubmit }) => (
	    <Modal
		className={classes.modal}
		onClose={() => history.goBack()}
		open
	    >
		<Card className={classes.modalCard}>
		    <form onSubmit={handleSubmit}>
			<CardContent className={classes.modalCardContent}>
			    <Field name="mutualAuthToken">
				{({ input }) => <TextField label="Mutual Auth Token" autoFocus {...input} />}
			    </Field>
			    <Field name="consumerAuthToken">
				{({ input }) => <TextField label="Consumer Auth Token" {...input} />}
			    </Field>
			</CardContent>
			<CardActions>
			    <Button size="small" color="primary" type="submit">Save</Button>
			    <Button size="small" onClick={() => history.goBack()}>Cancel</Button>
			</CardActions>
		    </form>
		</Card>
	    </Modal>
	)}
    </Form>
);

export default compose(
    withRouter,
    withStyles(styles)
)(TokenEditor);
