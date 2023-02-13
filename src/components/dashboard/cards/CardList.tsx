import React from 'react'
import CardItem from './CardItem'
import { GigIcon, OrderIcon, ProductIcon, ProposalIcon, RequestIcon, ServiceIcon } from '../../../assets';
import Image from 'next/image'

const CardList = (props: any) => {

    return (
        <>
            {props.isRole === 'merchant' && props.isMerchantType === 'business' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                    <CardItem
                        title={'Total Orders'}
                        icon={''}
                        stat={props.orders.length}
                        detail={`You have ${props.orders.length} orders`}
                    >
                        <Image src={OrderIcon} alt="order" width={90} height={90} />
                    </CardItem>

                    <CardItem
                        title={'Total Products'}
                        icon={''}
                        stat={props.products.length}
                        detail={`You have ${props.products.length} products`}
                    >
                        <Image src={ProductIcon} alt="order" width={90} height={90} />
                    </CardItem>

                    <CardItem
                        title={'Total Services'}
                        icon={''}
                        stat={props.services.length}
                        detail={`You have ${props.services.length} services`}
                    >
                        <Image src={ServiceIcon} alt="order" width={90} height={90} />
                    </CardItem>

                </div>
            )}

            {props.isRole === 'merchant' && props.isMerchantType === 'personal' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                    <CardItem
                        title={'Total Orders'}
                        icon={''}
                        stat={props.orders.length}
                        ddetail={`You have ${props.ordersForMe.length} orders`}
                    >
                        <Image src={OrderIcon} alt="order" width={90} height={90} />
                    </CardItem>

                    <CardItem
                        title={'Total Proposals'}
                        icon={''}
                        stat={props.proposals.length}
                        detail={`You have ${props.proposals.length} proposals`}
                    >
                        <Image src={ProposalIcon} alt="order" width={90} height={90} />
                    </CardItem>

                    <CardItem
                        title={'Total Gigs'}
                        icon={''}
                        stat={'5,834'}
                        detail={'You have 34 gigs'}
                    >
                        <Image src={GigIcon} alt="order" width={90} height={90} />
                    </CardItem>

                </div>
            )}

            {props.isRole === 'consumer' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                    <CardItem
                        title={'Total Orders'}
                        icon={''}
                        stat={props.ordersForMe.length}
                        detail={`You have ${props.ordersForMe.length} orders`}
                    >
                        <Image src={OrderIcon} alt="order" width={90} height={90} />
                    </CardItem>

                    <CardItem
                        title={'Total Gigs'}
                        icon={''}
                        stat={props.jobs.length}
                        detail={`You have ${props.jobs.length} gigs`}
                    >
                        <Image src={GigIcon} alt="order" width={90} height={90} />
                    </CardItem>

                    <CardItem
                        title={'Total Requests'}
                        icon={''}
                        stat={props.serviceRequests.length}
                        detail={`You have ${props.serviceRequests.length} requests`}
                    >
                        <Image src={RequestIcon} alt="order" width={90} height={90} />
                    </CardItem>

                </div>
            )}
        </>
    )
}

export default CardList