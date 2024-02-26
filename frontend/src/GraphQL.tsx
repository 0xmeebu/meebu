// Copyright 2022 Cartesi Pte. Ltd.

// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License. You may obtain a copy
// of the license at http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations
// under the License.

import React, { useMemo } from "react";
import { Client, createClient, Provider } from "urql";

import configFile from "./config.json";

const config: any = configFile;

const useGraphQL = () => {
    return useMemo<Client>(() => {

        let url =  "http://localhost:8080";

        return createClient({ url });
    }, []);
};

export const GraphQLProvider: any = (props: any) => {
    const client = useGraphQL();
    if (!client) {
        return <div />;
    }
    
    return <Provider value={client}>{props.children}</Provider>;
};

