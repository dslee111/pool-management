import React, { Component } from 'react'
import { Grid, TextField, Button } from '@material-ui/core'
import * as helpers from 'utils/helpers'
import { formNames } from 'stores/ManageForm'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { observer, inject } from 'mobx-react'
import { validators } from 'components/validators'

@inject('root')
@observer
class SetFees extends Component {
    updateProperty(form, key, value) {
        this.props.root.manageFormStore[form][key] = value
    }

    onChange = (event, form) => {
        console.log(event.target)
        console.log(form)
        this.updateProperty(form, event.target.name, event.target.value)
    }

    render() {
        const { manageFormStore, poolStore } = this.props.root
        const { poolAddress } = this.props

        const swapFee = manageFormStore.setFeeForm.swapFee
        const exitFee = manageFormStore.setFeeForm.exitFee

        return (
            <ValidatorForm
                ref="form"
                onSubmit={() => { poolStore.setFees(poolAddress, helpers.fromPercentageToFee(swapFee), helpers.fromPercentageToFee(exitFee)) }}
                onError={errors => console.log(errors)}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <TextValidator
                            id="swap-fee-amount"
                            label="Swap Fee"
                            type="number"
                            name="swapFee"
                            value={swapFee}
                            onChange={e => this.onChange(e, formNames.SET_FEE_FORM)}
                            fullWidth
                            validators={validators.requiredTokenValueValidators}
                            errorMessages={validators.requiredTokenValueValidatorErrors}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextValidator
                            id="exit-fee-amount"
                            label="Exit Fee"
                            type="number"
                            name="exitFee"
                            value={exitFee}
                            onChange={e => this.onChange(e, formNames.SET_FEE_FORM)}
                            fullWidth
                            validators={validators.requiredTokenValueValidators}
                            errorMessages={validators.requiredTokenValueValidatorErrors}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Button
                            type="submit"
                            variant="contained">
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </ValidatorForm>
        )
    }
}

export default SetFees