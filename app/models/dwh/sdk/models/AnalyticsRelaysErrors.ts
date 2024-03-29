/* tslint:disable */
/* eslint-disable */
/**
 * Portal DWH Service API
 * Service that provides data from DWH to the Portal
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface AnalyticsRelaysErrors
 */
export interface AnalyticsRelaysErrors {
    /**
     * 
     * @type {Date}
     * @memberof AnalyticsRelaysErrors
     */
    from?: Date;
    /**
     * 
     * @type {Date}
     * @memberof AnalyticsRelaysErrors
     */
    to?: Date;
    /**
     * 
     * @type {string}
     * @memberof AnalyticsRelaysErrors
     */
    accountId?: string;
    /**
     * 
     * @type {string}
     * @memberof AnalyticsRelaysErrors
     */
    portalApplicationId?: string;
    /**
     * 
     * @type {string}
     * @memberof AnalyticsRelaysErrors
     */
    chainId?: string;
    /**
     * 
     * @type {string}
     * @memberof AnalyticsRelaysErrors
     */
    chainMethod?: string;
    /**
     * 
     * @type {string}
     * @memberof AnalyticsRelaysErrors
     */
    errorType?: string;
    /**
     * 
     * @type {string}
     * @memberof AnalyticsRelaysErrors
     */
    errorName?: string;
    /**
     * 
     * @type {number}
     * @memberof AnalyticsRelaysErrors
     */
    cnt?: number;
}

/**
 * Check if a given object implements the AnalyticsRelaysErrors interface.
 */
export function instanceOfAnalyticsRelaysErrors(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function AnalyticsRelaysErrorsFromJSON(json: any): AnalyticsRelaysErrors {
    return AnalyticsRelaysErrorsFromJSONTyped(json, false);
}

export function AnalyticsRelaysErrorsFromJSONTyped(json: any, ignoreDiscriminator: boolean): AnalyticsRelaysErrors {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'from': !exists(json, 'from') ? undefined : (new Date(json['from'])),
        'to': !exists(json, 'to') ? undefined : (new Date(json['to'])),
        'accountId': !exists(json, 'account_id') ? undefined : json['account_id'],
        'portalApplicationId': !exists(json, 'portal_application_id') ? undefined : json['portal_application_id'],
        'chainId': !exists(json, 'chain_id') ? undefined : json['chain_id'],
        'chainMethod': !exists(json, 'chain_method') ? undefined : json['chain_method'],
        'errorType': !exists(json, 'error_type') ? undefined : json['error_type'],
        'errorName': !exists(json, 'error_name') ? undefined : json['error_name'],
        'cnt': !exists(json, 'cnt') ? undefined : json['cnt'],
    };
}

export function AnalyticsRelaysErrorsToJSON(value?: AnalyticsRelaysErrors | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'from': value.from === undefined ? undefined : (value.from.toISOString().substring(0,10)),
        'to': value.to === undefined ? undefined : (value.to.toISOString().substring(0,10)),
        'account_id': value.accountId,
        'portal_application_id': value.portalApplicationId,
        'chain_id': value.chainId,
        'chain_method': value.chainMethod,
        'error_type': value.errorType,
        'error_name': value.errorName,
        'cnt': value.cnt,
    };
}

