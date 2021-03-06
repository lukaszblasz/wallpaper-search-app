import React from 'react';
import {NativeModules, StyleSheet, FlatList, Text, View} from 'react-native';
import ImageTileComponent from '../imageTile/imageTile';

export default class ListComponent extends React.Component {
    constructor(props){
        super(props);
    }

    _setWallpaper(details) {
        NativeModules.WallpaperManagerModule.setNewWallpaperFromUrl(details.srcLarge);
    }

    _endReached() {
        this.props.getData();
    }

    componentDidMount() {
        this.props.getData();
    }

    render() {
        return (
            <View>
                {this.props.items.length ? (
                    <FlatList
                        numColumns={2}
                        extraData={this.state}
                        data={this.props.items}
                        renderItem={({item, index}) => {
                            return (
                                <View style={index % 2 ? styles.listItemOdd : styles.listItemEven}>
                                    <ImageTileComponent
                                        details={item}
                                        onItemSelected={this._setWallpaper.bind(this)}
                                    ></ImageTileComponent>
                                </View>
                            )
                        }
                        }
                        onEndReached={this._endReached.bind(this)}
                        onEndReachedThreshold = {1}
                    ></FlatList>
                    ): (< Text >No results found</Text>)
                }
            </View>
        );
    }
}


const styles = StyleSheet.create({
    listItemOdd: {
        flex: 1
    },
    listItemEven: {
        flex: 1
    }
});

