/**
*
* MOD3  Break Modifier
*
*
**/
(function(MOD3, undef){
    
    var Vector3=MOD3.Vector3, Range=MOD3.Range,
        Matrix4=MOD3.Matrix4
    ;
    
    var Break = MOD3.Break = MOD3.Extends ( MOD3.Modifier,
    {
        constructor : function(o, a) {
            this.bv = new Vector3([0, 1, 0]);
            this.range = new Range(0,1);
            
            this.offset = (o!==undef) ? o : 0;
            this.angle = (a!==undef) ? a : 0;
        },
        
        bv : null,
        range : null,
        offset : 0,
        angle : 0,
        
        apply : function() {
            var mod = this.mod, vs = mod.getVertices(), vc = vs.length,
                offset = this.offset, range = this.range, angle = this.angle, bv = this.bv, bvxyz=bv.xyz;
            var pv, npv, v, c, rm;

            pv = new Vector3([0, 0, -(mod.minZ + mod.depth * offset)]);
            npv = pv.negate();
            rm = new Matrix4().rotationMatrix(bvxyz[0], bvxyz[1], bvxyz[2], angle);


            // optimize loop using while counting down instead of up
            while (--vc >= 0)
            //for (var i = 0;i < vc; i++) 
            {
                v = vs[vc];
                c = v.getVector().addSelf( pv );

                if( c.xyz[2] >= 0 && range.isIn( v.ratio[1] ) ) 
                {
                    rm.multiplyVector( c );
                }
                
                v.setVector( c.addSelf( npv ) );
            }
             
            return this;
       }
    });
    
})(MOD3);