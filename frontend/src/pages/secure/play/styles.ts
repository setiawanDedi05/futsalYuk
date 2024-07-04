import styled from "styled-components";
import { device } from "../../../config/constants";
import * as color from "../../../config/color";

const PlayDetailContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    padding: 0 20px;
    >:first-child{
        flex-direction: row;
        border-bottom: none;
        border-top-left-radius: 16px;
        border-top-right-radius: 16px;
        background: linear-gradient(90deg, ${color.green} 0%, ${color.white} 100%);
    }
    >:not(:first-child):not(:last-child){
        border-bottom: none;
        border-top: 1px dashed ${color.gray};
    }
    >:last-child{
        flex-direction: row;
        background: linear-gradient(90deg, ${color.white} 0%, ${color.green} 100%);
        border-top-style: dashed;
        border-bottom-left-radius: 16px;
        border-bottom-right-radius: 16px;
    }
    `

const PlayerDetailList = styled.div`
    background-color: ${color.white};
    padding: 5px 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid black;
    font-size: .7rem;
    >:first-child{
        text-transform: uppercase;
    }
    @media ${device.tablet} {
        width: 80%;
    }
`

const DetailLabel = styled.div`
    font-weight: bold;
`

const DetailContent = styled.div`

`

const Table = styled.table`
    background-color: ${color.white};
    width: 100%;
    padding: 0 10px;
    border-radius: 8px;
    box-shadow: 1px 1px 1px #888;
    `

const PlayersTag = styled.div`
    margin-top: 20px;
    margin-bottom: 10px;
    text-transform: uppercase;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    padding: 0px 10px;
`

const ButtonAddPlayer = styled.button`
    padding: 8px 16px;
    background-color: ${color.green};
    color: ${color.white};
    border: none;
    border-radius: 16px;
    text-transform: uppercase;
    font-weight: bold;
`

const TableHead = styled.thead`
`

const TableBody = styled.tbody`
`

const TableRow = styled.tr`
    >:last-child{
        text-align: end;
    }
`

const TableColHead = styled.th`
    text-align: start;
    text-transform: uppercase;
    padding-top: 10px;
`

const TableColData = styled.td`
    padding: 10px 0px;
`

export {
    PlayDetailContainer,
    PlayerDetailList,
    DetailLabel,
    DetailContent,
    Table,
    PlayersTag,
    TableHead,
    TableBody,
    TableRow,
    TableColHead,
    TableColData,
    ButtonAddPlayer
}