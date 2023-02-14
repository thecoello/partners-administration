import React from "react";

interface IProps {

}

interface IState {

}

export default class Home extends React.Component<IProps,IState>{

    constructor(props: IProps) {
        super(props)
      }

      render(): React.ReactNode {
          return(
            <>
            <div className="section">
              <div id="home">
                <div className="container">
                  <div className="row">
                    
                  </div>
                </div>
    
              </div>
            </div>
          </>
          )
      }
    

}