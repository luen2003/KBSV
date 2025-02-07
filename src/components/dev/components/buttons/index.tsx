import { Buttons } from "@components/common";

const ButtonsDev = () => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <Buttons prop="Outlined" size="XS">
            Outlined XS
          </Buttons>
          <Buttons prop="Outlined" size="S">
            Outlined S
          </Buttons>
          <Buttons prop="Outlined" size="M">
            Outlined M
          </Buttons>
          <Buttons prop="Outlined" size="L">
            Outlined L
          </Buttons>
          <Buttons prop="Outlined" size="XL">
            Outlined XL
          </Buttons>
        </div>
        <div className="flex gap-4">
          <Buttons prop="Outlined" disabled size="XS">
            Outlined XS Disabled
          </Buttons>
          <Buttons prop="Outlined" disabled size="S">
            Outlined S Disabled
          </Buttons>
          <Buttons prop="Outlined" disabled size="M">
            Outlined M Disabled
          </Buttons>
          <Buttons prop="Outlined" disabled size="L">
            Outlined L Disabled
          </Buttons>
          <Buttons prop="Outlined" disabled size="XL">
            Outlined XL Disabled
          </Buttons>
        </div>
        <div className="flex gap-4">
          <Buttons prop="Filled 1" size="XS">
            Filled 1 XS
          </Buttons>
          <Buttons prop="Filled 1" size="S">
            Filled 1 S
          </Buttons>
          <Buttons prop="Filled 1" size="M">
            Filled 1 M
          </Buttons>
          <Buttons prop="Filled 1" size="L">
            Filled 1 L
          </Buttons>
          <Buttons prop="Filled 1" size="XL">
            Filled 1 XL
          </Buttons>
        </div>

        <div className="flex gap-4">
          <Buttons prop="Filled 2" size="XS">
            Filled 2 XS
          </Buttons>
          <Buttons prop="Filled 2" size="S">
            Filled 2 S
          </Buttons>
          <Buttons prop="Filled 2" size="M">
            Filled 2 M
          </Buttons>
          <Buttons prop="Filled 2" size="L">
            Filled 2 L
          </Buttons>
          <Buttons prop="Filled 2" size="XL">
            Filled 2 XL
          </Buttons>
        </div>

        <div className="flex gap-4">
          <Buttons prop="Mua" size="XS">
            Mua XS
          </Buttons>
          <Buttons prop="Mua" size="S">
            Mua S
          </Buttons>
          <Buttons prop="Mua" size="M">
            Mua M
          </Buttons>
          <Buttons prop="Mua" size="L">
            Mua L
          </Buttons>
          <Buttons prop="Mua" size="XL">
            Mua XL
          </Buttons>
        </div>
        <div className="flex gap-4">
          <Buttons prop="Bán" size="XS">
            Bán XS
          </Buttons>
          <Buttons prop="Bán" size="S">
            Bán S
          </Buttons>
          <Buttons prop="Bán" size="M">
            Bán M
          </Buttons>
          <Buttons prop="Bán" size="L">
            Bán L
          </Buttons>
          <Buttons prop="Bán" size="XL">
            Bán XL
          </Buttons>
        </div>
      </div>
    </>
  );
};

const renderSource = ``;

const iProps = ``;

const buttons = { ui: <ButtonsDev />, renderSource, iProps };

export default buttons;
