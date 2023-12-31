import React, {useState} from "react";

import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import FilterItem from "../../components/FilterItem/FilterItem";
import Modal from "../../components/Modal/Modal";

import loupe from "../../assets/images/loupe.png"
import filterImg from "../../assets/images/filter.png"
import cross from "../../assets/images/close.png"
import edit from "../../assets/images/edit.png"
import arrow from "../../assets/images/select.svg"

import "./home.scss"

const Home = () => {
    const filterItems = ["Товарная группа", "Статус аукциона", "Новая заявка", "Выбрать период"]
    const pagesMock = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const [auctionItems, setAuctionItems] = useState([
        {
            number: 1,
            name: 'Аукцион на закупку в интересах компании ООО "Фабрика"',
            receptionDate: '17.04.23-18.04.23',
            startDate: '18.04.23',
            status: 'Черновик'
        },
        {
            number: 2,
            name: 'Аукцион на закупку в интересах компании ООО "Пресс"',
            receptionDate: '17.04.23-18.04.23',
            startDate: '18.04.23',
            status: 'Сбор заявок'
        },
        {
            number: 3,
            name: 'Аукцион на закупку в интересах компании ООО "Компания"',
            receptionDate: '17.04.23-18.04.23',
            startDate: '18.04.23',
            status: 'Идут торги'
        },
        {
            number: 4,
            name: 'Аукцион на закупку в интересах компании ООО "Кот"',
            receptionDate: '17.04.23-18.04.23',
            startDate: '18.04.23',
            status: 'В архиве'
        },
    ])
    const [openAddModal, setOpenAddModal] = useState(false)
    const [openEditModal, setOpenEditModal] = useState(false)
    const [currentEditAuction, setCurrentEditAuction] = useState(null)
    return (
        <div className="home">
            <BreadCrumbs links={[
                { name: "Главная", link: "/" },
            ]} />
            <h2 className="home__title">Аукционы</h2>
            <div className="home__info">
                <div className="info__top">
                    <button onClick={() => setOpenAddModal(true)}>
                        + Добавить аукцион
                    </button>
                    <div className="info__search">
                        <input placeholder="Найти аукцион" type="text" />
                        <img src={loupe} alt='loupe' />
                    </div>
                </div>
                <div className="info__filters">
                    <img className="info__filtersImg" src={filterImg} alt="filter" />
                    <div className="info__filters__items">
                        {filterItems.map((item) => {
                          return <FilterItem title={item} key={item} />
                        })}
                    </div>
                    <button className="filter__reset">
                        <img src={cross} alt="cross" />
                        Сбросить фильтры
                    </button>
                    <button className="filter__confirm">Применить</button>
                </div>
                <div className="info__tableWrapper">
                    <table>
                        <thead>
                            <tr className="tableItem">
                                <td>№</td>
                                <td>Название аукциона</td>
                                <td className="center">Прием заявок</td>
                                <td className="center">Проведение</td>
                                <td className="center">Статус</td>
                            </tr>
                        </thead>
                        <tbody>
                            {auctionItems.map((item) => {
                              return <tr className="tableItem" key={item.number}>
                                  <td>{item.number}</td>
                                  <td className="tableItem__name">{item.name}</td>
                                  <td className="center">{item.receptionDate}</td>
                                  <td className="center">{item.startDate}</td>
                                  <td className="center">{item.status}</td>
                                  <td className="tableItem__edit">
                                      <img src={edit} alt="edit" onClick={() => {
                                          setCurrentEditAuction(item)
                                          setOpenEditModal(true)
                                      }}/>
                                  </td>
                              </tr>
                            })}
                        </tbody>
                    </table>
                    <div className="table__pages">
                        <img className="prev" src={arrow} alt="arrow" />
                        {pagesMock.slice(0, 5).map((item) => {
                            return <p className={item === 1 ? "active" : ""} key={item}>{item}</p>
                        })}
                        {pagesMock.length > 5 &&
                            <>
                                <span>...</span>
                                <p>{pagesMock.length}</p>
                            </>
                        }
                        <img className="next" src={arrow} alt="arrow" />
                    </div>
                </div>
            </div>
            {openAddModal &&
                <Modal
                    type='add'
                    active={openAddModal}
                    close={setOpenAddModal}
                    setAuctionItems={setAuctionItems}
                />
            }
            {currentEditAuction &&
                <Modal
                    type='edit'
                    active={openEditModal}
                    close={setOpenEditModal}
                    currentAuction={currentEditAuction}
                    setAuctionItems={setAuctionItems}
                />
            }
        </div>
    );
};

export default Home;
