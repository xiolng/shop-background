import {Route, Switch} from "react-router-dom"
import React from "react"
import Login from "@/view/login"
import Index from "@/view"
import NotFound from "@/view/404/index"
import LayoutModule from "@/view/layout"
import Dashboard from "@/view/dashboard"
import DashboardDetail from "@/view/dashboard/detail"

export const routeConfig = [
    {
        path: "/login",
        name: "login",
        hideMenu: true,
        component: Login,
        exact: true
    },
    {
        name: "Home",
        icon: "user",
        routes: [
            {
                path: "/",
                name: "index",
                icon: "user",
                parent: "Home",
                component: Index,
                hideMenu: true,
                exact: true
            },
            {
                path: "/dashboard",
                name: "dashboard",
                icon: "user",
                parent: "Home",
                component: Dashboard,
                exact: true
            },
            {
                path: "/DashboardDetail/:id",
                name: "/dashboardDetail",
                icon: "user",
                parent: "dashboard",
                hideMenu: true,
                component: DashboardDetail,
                exact: false
            },
            {
                path: "/*",
                name: "notFound",
                icon: "user",
                parent: "Home",
                hideMenu: true,
                component: NotFound,
                exact: false
            }
        ]
    },
    {
        path: "/*",
        name: "notFound",
        hideMenu: true,
        component: NotFound,
        exact: false
    }
]

export const routeList = () => (
    <Switch>
        {
            routeConfig.map((item, index) => {
                if (!item.routes) {
                    return (<Route exact={item.exact} path={item.path} component={item.component} key={index} />)
                }
                if (item.name === 'Home') {
                    return (
                        <LayoutModule key={index}>
                            <Switch>
                                {
                                    item.routes.map((v, i) => (
                                        <Route exact={v.exact} path={v.path} component={v.component} key={i} />
                                    ))
                                }
                            </Switch>
                        </LayoutModule>
                    )
                }
            })
        }
    </Switch>
)